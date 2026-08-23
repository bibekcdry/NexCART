from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, VendorProfile, Address


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('phone', 'role', 'profile_picture', 'bio', 'is_verified')}),
    )
    list_display = ('username', 'email', 'role', 'is_verified', 'created_at')
    list_filter = ('role', 'is_verified', 'created_at')
    search_fields = ('username', 'email', 'phone')


@admin.register(VendorProfile)
class VendorProfileAdmin(admin.ModelAdmin):
    list_display = ('store_name', 'user', 'city', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('store_name', 'user__username', 'city')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'user', 'city', 'is_default', 'created_at')
    list_filter = ('is_default', 'is_shipping', 'created_at')
    search_fields = ('full_name', 'user__username', 'city')
    readonly_fields = ('created_at', 'updated_at')
