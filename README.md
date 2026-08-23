# NexCart - E-Commerce Platform

A full-featured, multi-vendor e-commerce platform built with Django and REST Framework. NexCart allows customers to shop, vendors to sell products, and admins to manage the entire platform.

## Features

### Customer Features
- User registration and authentication
- Browse products by category
- Search and filter products
- Add products to cart
- Wishlist management
- Place orders
- Multiple payment methods (Credit Card, Debit Card, Bank Transfer, Digital Wallet, Cash on Delivery)
- Order tracking with shipment information
- Product reviews and ratings
- Order history
- Address management

### Vendor Features
- Vendor profile management
- Product management (create, edit, delete)
- Inventory tracking
- Sales analytics
- Commission tracking
- Store branding (logo, banner)
- Product image management

### Admin Features
- User management
- Vendor management and approval
- Product moderation
- Order management
- Payment tracking
- Commission management
- Analytics dashboard

## Technology Stack

**Backend:**
- Python 3.10+
- Django 4.2
- Django REST Framework 3.14
- PostgreSQL / SQLite (development)

**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)
- Responsive Design

**Additional Libraries:**
- Pillow (Image processing)
- django-cors-headers (CORS support)
- Stripe (Payment processing)
- Gunicorn (WSGI server)

## Project Structure

```
NexCART/
├── nexcart/                 # Project configuration
│   ├── settings.py         # Django settings
│   ├── urls.py            # URL routing
│   ├── wsgi.py            # WSGI configuration
│   └── __init__.py
├── users/                   # User authentication and management
│   ├── models.py          # User, VendorProfile, Address models
│   ├── views.py           # User viewsets
│   ├── serializers.py     # User serializers
│   ├── urls.py            # User URLs
│   ├── admin.py           # Admin configuration
│   └── apps.py
├── products/                # Product management
│   ├── models.py          # Product, Category, Review, Wishlist models
│   ├── views.py           # Product viewsets
│   ├── serializers.py     # Product serializers
│   ├── urls.py            # Product URLs
│   ├── admin.py           # Admin configuration
│   └── apps.py
├── orders/                  # Order and cart management
│   ├── models.py          # Cart, Order, Payment, Shipment models
│   ├── views.py           # Order viewsets
│   ├── serializers.py     # Order serializers
│   ├── urls.py            # Order URLs
│   ├── admin.py           # Admin configuration
│   └── apps.py
├── templates/              # HTML templates
│   ├── index.html
│   ├── products.html
│   ├── cart.html
│   ├── login.html
│   └── register.html
├── static/                 # Static files
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── main.js
│       ├── products.js
│       ├── auth.js
│       └── cart.js
├── manage.py               # Django management script
├── requirements.txt        # Python dependencies
└── db.sqlite3             # SQLite database (development)
```

## Installation

### Prerequisites
- Python 3.10+
- pip (Python package manager)
- Virtual environment (recommended)

### Setup Steps

1. **Clone the repository:**
```bash
git clone https://github.com/bibekcdry/NexCART.git
cd NexCART
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create database migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Create superuser (admin):**
```bash
python manage.py createsuperuser
```

6. **Collect static files:**
```bash
python manage.py collectstatic
```

7. **Run development server:**
```bash
python manage.py runserver
```

The application will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/users/register/` - Register new user
- `POST /api/users/login/` - Login user
- `GET /api/users/me/` - Get current user profile
- `POST /api/users/logout/` - Logout user

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/featured/` - Get featured products
- `GET /api/products/categories/` - List categories
- `POST /api/products/reviews/` - Create product review

### Cart & Orders
- `GET /api/orders/cart/my_cart/` - Get user's cart
- `POST /api/orders/cart/add_item/` - Add item to cart
- `POST /api/orders/cart/remove_item/` - Remove item from cart
- `POST /api/orders/cart/update_item/` - Update item quantity
- `POST /api/orders/` - Create order
- `GET /api/orders/` - List user's orders
- `POST /api/orders/{id}/confirm_payment/` - Confirm payment

### Wishlist
- `GET /api/products/wishlist/my_wishlist/` - Get user's wishlist
- `POST /api/products/wishlist/add_product/` - Add to wishlist
- `POST /api/products/wishlist/remove_product/` - Remove from wishlist

### Vendor
- `GET /api/users/vendors/` - List vendors
- `POST /api/users/vendors/` - Create vendor profile
- `GET /api/users/vendors/{id}/` - Get vendor details

### Address
- `GET /api/users/addresses/` - List user addresses
- `POST /api/users/addresses/` - Create address
- `PUT /api/users/addresses/{id}/` - Update address
- `DELETE /api/users/addresses/{id}/` - Delete address

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin`

Manage:
- Users and roles
- Vendor profiles and approval
- Products and categories
- Orders and payments
- Shipments and tracking
- Reviews and ratings

## Configuration

### Settings
Update `nexcart/settings.py` for:
- Database configuration
- Email settings
- Payment gateway keys (Stripe)
- CORS allowed origins
- Static file paths

### Environment Variables
Create a `.env` file:
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost/nexcart
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## Usage

### As Customer
1. Register/Login
2. Browse products
3. Add to cart
4. Checkout
5. Select payment method
6. Place order
7. Track order status

### As Vendor
1. Register as vendor
2. Complete vendor profile
3. Add products
4. Manage inventory
5. Process orders
6. View sales analytics

### As Admin
1. Login to admin panel
2. Manage users and vendors
3. Approve/Reject vendors
4. Moderate products
5. Track payments
6. Generate reports

## Testing

Run tests:
```bash
python manage.py test
```

## Deployment

### Using Gunicorn
```bash
gunicorn nexcart.wsgi:application --bind 0.0.0.0:8000
```

### Using Docker
Create a `Dockerfile` and `docker-compose.yml` (templates included in docs)

### Environment-Specific Settings
- Set `DEBUG=False` in production
- Use PostgreSQL instead of SQLite
- Set proper `ALLOWED_HOSTS`
- Enable HTTPS and secure cookies
- Use environment variables for sensitive data

## Database Models

### Users App
- **CustomUser**: Extended Django User with role-based access
- **VendorProfile**: Vendor store information and settings
- **Address**: Shipping/billing addresses for customers

### Products App
- **Category**: Product categories
- **Product**: Product information with pricing and inventory
- **ProductImage**: Additional product images
- **ProductReview**: Customer reviews and ratings
- **Wishlist**: Customer wishlist items

### Orders App
- **Cart**: Shopping cart
- **CartItem**: Items in cart
- **Order**: Customer orders
- **OrderItem**: Items in order
- **Payment**: Payment information and status
- **Shipment**: Shipment tracking information

## Security Considerations

- CSRF protection enabled
- SQL injection prevention (ORM)
- XSS protection (DRF serializers)
- Password hashing (bcrypt)
- Authentication via tokens
- Role-based access control
- Input validation
- HTTPS recommended for production

## Performance Optimization

- Database indexing on frequently queried fields
- Query optimization with select_related/prefetch_related
- Caching strategy for static content
- Pagination for large datasets
- Image optimization and CDN integration (optional)

## Troubleshooting

### Common Issues

1. **Database errors:**
   ```bash
   python manage.py migrate
   ```

2. **Static files not loading:**
   ```bash
   python manage.py collectstatic --noinput
   ```

3. **Permission errors:**
   - Check user roles and permissions
   - Verify authentication tokens

4. **CORS errors:**
   - Update `CORS_ALLOWED_ORIGINS` in settings.py

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - See LICENSE file for details

## Support

For support, email support@nexcart.com or open an issue on GitHub.

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Live chat support
- [ ] Subscription products
- [ ] Digital products marketplace
- [ ] Advanced seller tools
- [ ] Buyer protection program
- [ ] Affiliate program

## Authors

- **Bibek Chandra Dary** - *Initial work* - [GitHub](https://github.com/bibekcdry)

## Acknowledgments

- Django Community
- Django REST Framework
- Stack Overflow Community
- Contributors and testers

---

**Last Updated**: August 2083
**Version**: 1.0.0
