# Development Setup

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/bibekcdry/NexCART.git
cd NexCART
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Database Setup
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Admin User
```bash
python manage.py createsuperuser
```

### 6. Run Development Server
```bash
python manage.py runserver
```

Access the application at:
- Frontend: http://localhost:8000
- Admin Panel: http://localhost:8000/admin
- API: http://localhost:8000/api

## Project Structure

```
nexcart/
├── nexcart/              # Project settings
├── users/                # User management app
├── products/             # Product management app
├── orders/               # Order management app
├── templates/            # HTML templates
├── static/               # CSS, JS, images
├── manage.py             # Django CLI
├── requirements.txt      # Python dependencies
├── README.md             # Project documentation
├── API_DOCUMENTATION.md  # API reference
└── .gitignore           # Git ignore rules
```

## Key Features Implemented

✅ User Authentication (Registration, Login, Profile)
✅ Role-based Access Control (Customer, Vendor, Admin)
✅ Product Management (Add, Edit, Delete, Search)
✅ Shopping Cart (Add, Remove, Update quantity)
✅ Orders (Create, Track, History)
✅ Payment Processing (Multiple methods)
✅ Wishlist Management
✅ Product Reviews & Ratings
✅ Vendor Management
✅ Admin Dashboard
✅ Responsive Design
✅ REST API

## Available Endpoints

See `API_DOCUMENTATION.md` for detailed API reference.

## Database Models

### Users
- CustomUser (Extended Django User)
- VendorProfile
- Address

### Products
- Category
- Product
- ProductImage
- ProductReview
- Wishlist

### Orders
- Cart
- CartItem
- Order
- OrderItem
- Payment
- Shipment

## Admin Panel Access

1. Go to http://localhost:8000/admin
2. Login with superuser credentials
3. Manage all models from the admin interface

## Frontend Pages

- `/` - Home page
- `/products` - Products listing
- `/cart` - Shopping cart
- `/login` - User login
- `/register` - User registration
- `/checkout` - Checkout page

## Common Commands

```bash
# Create new app
python manage.py startapp appname

# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver

# Run tests
python manage.py test

# Collect static files
python manage.py collectstatic
```

## Troubleshooting

### Port Already in Use
```bash
python manage.py runserver 8001
```

### Database Errors
```bash
python manage.py migrate --run-syncdb
```

### Import Errors
```bash
pip install -r requirements.txt --upgrade
```

## Next Steps

1. Add payment gateway integration (Stripe)
2. Implement email notifications
3. Add SMS notifications
4. Create mobile app
5. Implement analytics
6. Add AI recommendations
7. Deploy to production

## Support

For issues or questions:
- Check API_DOCUMENTATION.md
- Review README.md
- Check Django/DRF documentation
- Open GitHub issues

## License

MIT License
