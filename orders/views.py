from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.text import slugify
from datetime import datetime
import uuid

from .models import Cart, CartItem, Order, OrderItem, Payment, Shipment
from .serializers import (
    CartSerializer, CartItemSerializer, OrderSerializer,
    OrderItemSerializer, PaymentSerializer, ShipmentSerializer
)


class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def my_cart(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def add_item(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        if not product_id:
            return Response({'error': 'product_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        cart, created = Cart.objects.get_or_create(user=request.user)
        
        try:
            from products.models import Product
            product = Product.objects.get(id=product_id)
            
            if product.stock < quantity:
                return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)
            
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={'quantity': quantity, 'price': product.discount_price or product.price}
            )
            
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
            
            return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def remove_item(self, request):
        product_id = request.data.get('product_id')
        cart = Cart.objects.filter(user=request.user).first()
        
        if not cart:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            CartItem.objects.filter(cart=cart, product_id=product_id).delete()
            return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def update_item(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        cart = Cart.objects.filter(user=request.user).first()
        if not cart:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
            cart_item.quantity = quantity
            cart_item.save()
            return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['post'])
    def clear_cart(self, request):
        cart = Cart.objects.filter(user=request.user).first()
        if cart:
            cart.items.all().delete()
        return Response({'message': 'Cart cleared'}, status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        shipping_address_id = request.data.get('shipping_address_id')
        payment_method = request.data.get('payment_method')
        notes = request.data.get('notes', '')
        
        if not shipping_address_id or not payment_method:
            return Response(
                {'error': 'shipping_address_id and payment_method are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart = Cart.objects.filter(user=request.user).first()
        if not cart or not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            from users.models import Address
            shipping_address = Address.objects.get(id=shipping_address_id, user=request.user)
            
            order = Order.objects.create(
                order_number=f"ORD-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}",
                user=request.user,
                shipping_address=shipping_address,
                payment_method=payment_method,
                subtotal=cart.total_price,
                tax=cart.total_price * 0.13,
                shipping_cost=50,
                notes=notes
            )
            order.total_price = order.subtotal + order.tax + order.shipping_cost
            order.save()
            
            for cart_item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    quantity=cart_item.quantity,
                    price=cart_item.price,
                    total_price=cart_item.total_price
                )
            
            Payment.objects.create(
                order=order,
                amount=order.total_price,
                payment_method=payment_method
            )
            
            cart.items.all().delete()
            
            return Response(
                OrderSerializer(order).data,
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def confirm_payment(self, request, pk=None):
        order = self.get_object()
        payment = order.payment
        payment.status = 'completed'
        payment.transaction_id = f"TXN-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        payment.save()
        
        order.is_paid = True
        order.status = 'confirmed'
        order.save()
        
        Shipment.objects.create(
            order=order,
            tracking_number=f"TRACK-{str(uuid.uuid4())[:12].upper()}",
            carrier='Default Carrier'
        )
        
        return Response(OrderSerializer(order).data)


class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Payment.objects.filter(order__user=self.request.user)


class ShipmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ShipmentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Shipment.objects.filter(order__user=self.request.user)
