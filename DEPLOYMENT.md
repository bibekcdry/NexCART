# Deployment Guide

## Production Checklist

- [ ] Set DEBUG=False
- [ ] Generate strong SECRET_KEY
- [ ] Use PostgreSQL database
- [ ] Set up HTTPS/SSL
- [ ] Configure ALLOWED_HOSTS
- [ ] Set up email backend
- [ ] Configure CDN for static files
- [ ] Set up backup strategy
- [ ] Configure logging
- [ ] Set up monitoring
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Test payment gateway
- [ ] Set up error tracking (Sentry)
- [ ] Configure automated deployments

## Using Heroku

### 1. Install Heroku CLI
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create Heroku App
```bash
heroku create your-app-name
```

### 4. Add PostgreSQL
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

### 5. Set Environment Variables
```bash
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=your-secret-key
```

### 6. Deploy
```bash
git push heroku main
```

### 7. Run Migrations
```bash
heroku run python manage.py migrate
```

### 8. Create Superuser
```bash
heroku run python manage.py createsuperuser
```

## Using AWS

### 1. Create EC2 Instance
- Use Ubuntu 22.04 LTS
- Configure security groups
- Create elastic IP

### 2. Install Dependencies
```bash
sudo apt-get update
sudo apt-get install -y python3.10 python3-pip postgresql nginx
```

### 3. Clone Repository
```bash
git clone https://github.com/bibekcdry/NexCART.git
cd NexCART
```

### 4. Setup Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 5. Configure PostgreSQL
```bash
sudo -u postgres createdb nexcart
sudo -u postgres createuser nexcart
```

### 6. Setup Django
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
```

### 7. Configure Gunicorn
Create `/etc/systemd/system/gunicorn.service`

### 8. Configure Nginx
Create `/etc/nginx/sites-available/nexcart`

## Using DigitalOcean

### 1. Create Droplet
- Choose Ubuntu 22.04 LTS
- Select appropriate size
- Add SSH keys

### 2. Setup Server
```bash
ssh root@your_droplet_ip
apt-get update && apt-get upgrade -y
apt-get install -y python3.10 python3-pip postgresql nginx
```

### 3. Follow AWS setup steps 3-8

## SSL Certificate (Let's Encrypt)

### Install Certbot
```bash
sudo apt-get install certbot python3-certbot-nginx
```

### Generate Certificate
```bash
sudo certbot certonly --standalone -d yourdomain.com
```

### Auto-renewal
```bash
sudo certbot renew --dry-run
```

## Database Backup

### PostgreSQL Backup
```bash
pg_dump -U nexcart -h localhost nexcart > backup.sql
```

### Restore Backup
```bash
psql -U nexcart -h localhost nexcart < backup.sql
```

## Monitoring

### Use Sentry for Error Tracking
```bash
pip install sentry-sdk
```

Add to settings.py:
```python
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[DjangoIntegration()]
)
```

## Performance Optimization

### Database
- Add indexes on frequently queried fields
- Use database connection pooling
- Regular VACUUM and ANALYZE

### Caching
- Enable Redis caching
- Cache template fragments
- Cache API responses

### Static Files
- Use CDN (CloudFront, CloudFlare)
- Enable gzip compression
- Minify CSS/JS

### Server
- Use nginx reverse proxy
- Enable keep-alive
- Configure worker processes

## Security Hardening

```python
# settings.py
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
HSTS_SECONDS = 31536000
HSTS_INCLUDE_SUBDOMAINS = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_SECURITY_POLICY = {...}
```

## Scaling

- Horizontal scaling with load balancing
- Database read replicas
- Separate worker servers
- CDN for static content
- Caching layer (Redis)

## Logging

### Application Logs
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django/error.log',
        },
    },
}
```

## CI/CD Pipeline

Example GitHub Actions workflow in `.github/workflows/deploy.yml`

## Support

For deployment issues:
- Check logs
- Review deployment guide
- Check environment variables
- Verify database connectivity
- Test API endpoints
