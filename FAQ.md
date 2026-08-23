# Frequently Asked Questions

## General

### What is NexCart?
NexCart is a full-featured, multi-vendor e-commerce platform built with Django and REST Framework.

### Can I use NexCart for my business?
Yes! NexCart is open source and available under the MIT License.

### What are the system requirements?
- Python 3.10+
- Django 4.2
- PostgreSQL (recommended) or SQLite (development)
- Modern web browser

## Installation

### How do I install NexCart?
See SETUP.md for detailed installation instructions.

### Can I run it on Windows?
Yes, follow the setup guide with Windows-specific commands.

### What if I get a port already in use error?
```bash
python manage.py runserver 8001
```

## Usage

### How do I create a vendor account?
1. Register as a user
2. Select "Vendor" as role during registration
3. Complete vendor profile
4. Start adding products

### How do customers make purchases?
1. Register/Login
2. Browse products
3. Add to cart
4. Checkout with shipping address
5. Select payment method
6. Place order

### How do I access the admin panel?
Go to http://localhost:8000/admin and login with superuser credentials.

## Features

### What payment methods are supported?
- Credit Card
- Debit Card
- Bank Transfer
- Digital Wallet
- Cash on Delivery

### Can I add product images?
Yes, you can add a main image and multiple additional images.

### How does the review system work?
Customers can leave ratings and reviews after purchase. Reviews are moderated by admins.

## Technical

### How do I use the API?
See API_DOCUMENTATION.md for detailed endpoint reference.

### How do I run tests?
```bash
python manage.py test
```

### How do I collect static files?
```bash
python manage.py collectstatic
```

### What database should I use for production?
PostgreSQL is recommended. SQLite is only for development.

## Troubleshooting

### I'm getting a 404 on the admin page
Make sure you've run migrations:
```bash
python manage.py migrate
```

### Static files are not loading
```bash
python manage.py collectstatic --noinput
```

### I forgot my admin password
Create a new superuser:
```bash
python manage.py createsuperuser
```

### How do I reset the database?
```bash
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

## Deployment

### How do I deploy to production?
See README.md Deployment section.

### Should I use DEBUG=True in production?
No, always set DEBUG=False in production.

### How do I secure the SECRET_KEY?
Store it in an environment variable, never commit it to version control.

## Support

### How do I get help?
- Check this FAQ
- Read API_DOCUMENTATION.md
- Review README.md
- Open a GitHub issue

### How do I report bugs?
Open a GitHub issue with:
- Clear description
- Steps to reproduce
- Screenshots if applicable

### Can I contribute?
Yes! See CONTRIBUTING.md for guidelines.

## More Questions?

Email: support@nexcart.com
GitHub Issues: https://github.com/bibekcdry/NexCART/issues
