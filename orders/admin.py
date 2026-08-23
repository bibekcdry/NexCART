from django.contrib import admin
from .models import Cart, CartItem, Order, OrderItem, Payment, Shipment


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_items', 'total_price', 'created_at')
    search_fields = ('user__username',)
    readonly_fields = ('created_at', 'updated_at')
    inlines = [CartItemInline]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'status', 'total_price', 'is_paid', 'created_at')
    list_filter = ('status', 'is_paid', 'payment_method', 'created_at')
    search_fields = ('order_number', 'user__username')
    readonly_fields = ('order_number', 'created_at', 'updated_at')
    inlines = [OrderItemInline]


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'amount', 'status', 'payment_method', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('order__order_number', 'transaction_id')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ('tracking_number', 'order', 'carrier', 'status', 'created_at')
    list_filter = ('status', 'carrier', 'created_at')
    search_fields = ('tracking_number', 'order__order_number')
    readonly_fields = ('created_at', 'updated_at')
