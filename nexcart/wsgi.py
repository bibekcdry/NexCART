"""
WSGI config for nexcart project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexcart.settings')

application = get_wsgi_application()
