from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, VendorProfileViewSet, AddressViewSet

router = DefaultRouter()
router.register(r'', UserViewSet, basename='users')
router.register(r'vendors', VendorProfileViewSet, basename='vendors')
router.register(r'addresses', AddressViewSet, basename='addresses')

urlpatterns = [
    path('', include(router.urls)),
]
