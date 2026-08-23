from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet, OrderViewSet, PaymentViewSet, ShipmentViewSet

router = DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'payments', PaymentViewSet, basename='payments')
router.register(r'shipments', ShipmentViewSet, basename='shipments')

urlpatterns = [
    path('', include(router.urls)),
]
