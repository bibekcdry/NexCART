from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem, Payment, Shipment
from products.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_details', 'quantity', 'price', 'total_price', 'created_at']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_items', 'total_price', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price', 'total_price']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'transaction_id', 'amount', 'status', 'payment_method', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = ['id', 'order', 'tracking_number', 'carrier', 'status', 'estimated_delivery', 'actual_delivery', 'created_at']
        read_only_fields = ['id', 'created_at']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    shipping_address = serializers.StringRelatedField()
    payment = PaymentSerializer(read_only=True)
    shipment = ShipmentSerializer(read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'shipping_address', 'payment_method',
            'status', 'subtotal', 'tax', 'shipping_cost', 'total_price',
            'notes', 'is_paid', 'items', 'payment', 'shipment', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'order_number', 'user', 'subtotal', 'tax', 'shipping_cost',
            'total_price', 'is_paid', 'items', 'payment', 'shipment', 'created_at', 'updated_at'
        ]
