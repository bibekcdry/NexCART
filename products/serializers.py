from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductReview, Wishlist


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'is_active']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']


class ProductReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    
    class Meta:
        model = ProductReview
        fields = ['id', 'product', 'customer', 'customer_name', 'rating', 'title', 'comment', 'is_verified_purchase', 'helpful_count', 'created_at']
        read_only_fields = ['id', 'customer', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    vendor_name = serializers.CharField(source='vendor.store_name', read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'discount_price', 'discount_percentage', 'stock', 'image', 'category', 'category_name', 'vendor', 'vendor_name', 'is_featured', 'rating', 'reviews_count', 'images', 'created_at']
        read_only_fields = ['id', 'slug', 'rating', 'created_at']
    
    def get_reviews_count(self, obj):
        return obj.reviews.count()


class WishlistSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'products', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
