# API Documentation - NexCart

## Base URL
```
http://localhost:8000/api
```

## Authentication
All authenticated endpoints require a token in the header:
```
Authorization: Bearer <token>
```

## User Endpoints

### Register
**POST** `/users/register/`
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123",
  "password_confirm": "securepass123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "customer"
}
```

### Login
**POST** `/users/login/`
```json
{
  "username": "johndoe",
  "password": "securepass123"
}
```

### Get Current User
**GET** `/users/me/` (Authenticated)

Response:
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "9841234567",
  "role": "customer",
  "is_verified": false
}
```

## Product Endpoints

### List Products
**GET** `/products/?page=1&limit=20`

Query Parameters:
- `category` - Filter by category ID
- `search` - Search by name or description
- `is_featured` - Filter featured products (true/false)
- `ordering` - Sort by field (price, -price, rating, -rating, -created_at)

### Get Product Details
**GET** `/products/{id}/`

### Get Featured Products
**GET** `/products/featured/`

### List Categories
**GET** `/products/categories/`

### Create Product Review
**POST** `/products/reviews/` (Authenticated)
```json
{
  "product": 1,
  "rating": 5,
  "title": "Excellent product!",
  "comment": "Very satisfied with this purchase."
}
```

### Get Product Reviews
**GET** `/products/{product_id}/reviews/`

## Cart Endpoints

### Get My Cart
**GET** `/orders/cart/my_cart/` (Authenticated)

Response:
```json
{
  "id": 1,
  "total_items": 3,
  "total_price": 1500.00,
  "items": [
    {
      "id": 1,
      "product": 1,
      "quantity": 2,
      "price": 500.00,
      "total_price": 1000.00
    }
  ]
}
```

### Add to Cart
**POST** `/orders/cart/add_item/` (Authenticated)
```json
{
  "product_id": 1,
  "quantity": 2
}
```

### Update Cart Item
**POST** `/orders/cart/update_item/` (Authenticated)
```json
{
  "product_id": 1,
  "quantity": 3
}
```

### Remove from Cart
**POST** `/orders/cart/remove_item/` (Authenticated)
```json
{
  "product_id": 1
}
```

### Clear Cart
**POST** `/orders/cart/clear_cart/` (Authenticated)

## Order Endpoints

### Create Order
**POST** `/orders/orders/` (Authenticated)
```json
{
  "shipping_address_id": 1,
  "payment_method": "credit_card",
  "notes": "Please deliver after 5 PM"
}
```

Payment Methods:
- `credit_card`
- `debit_card`
- `bank_transfer`
- `digital_wallet`
- `cash_on_delivery`

### List My Orders
**GET** `/orders/orders/` (Authenticated)

### Get Order Details
**GET** `/orders/orders/{id}/` (Authenticated)

### Confirm Payment
**POST** `/orders/orders/{id}/confirm_payment/` (Authenticated)

## Address Endpoints

### List Addresses
**GET** `/users/addresses/` (Authenticated)

### Create Address
**POST** `/users/addresses/` (Authenticated)
```json
{
  "full_name": "John Doe",
  "phone": "9841234567",
  "street_address": "123 Main St",
  "city": "Kathmandu",
  "state": "Bagmati",
  "zip_code": "44600",
  "country": "Nepal",
  "is_default": true,
  "is_shipping": true
}
```

### Update Address
**PUT** `/users/addresses/{id}/` (Authenticated)

### Delete Address
**DELETE** `/users/addresses/{id}/` (Authenticated)

## Vendor Endpoints

### List Vendors
**GET** `/users/vendors/`

### Get Vendor Details
**GET** `/users/vendors/{id}/`

### Create Vendor Profile
**POST** `/users/vendors/` (Authenticated)
```json
{
  "store_name": "My Store",
  "store_description": "Best products",
  "address": "123 Store St",
  "city": "Kathmandu",
  "state": "Bagmati",
  "zip_code": "44600",
  "country": "Nepal",
  "bank_account": "123456789",
  "bank_name": "Nepal Bank"
}
```

## Wishlist Endpoints

### Get My Wishlist
**GET** `/products/wishlist/my_wishlist/` (Authenticated)

### Add to Wishlist
**POST** `/products/wishlist/add_product/` (Authenticated)
```json
{
  "product_id": 1
}
```

### Remove from Wishlist
**POST** `/products/wishlist/remove_product/` (Authenticated)
```json
{
  "product_id": 1
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Permission denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content returned
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

None currently implemented. Can be added using `django-ratelimit`.

## CORS

CORS is enabled for:
- http://localhost:3000
- http://127.0.0.1:3000

Update `CORS_ALLOWED_ORIGINS` in settings.py for production.
