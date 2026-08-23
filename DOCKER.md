# Build and run with Docker

## Prerequisites
- Docker
- Docker Compose

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/bibekcdry/NexCART.git
cd NexCART
```

### 2. Build and Start Services
```bash
docker-compose up --build
```

### 3. Run Migrations
```bash
docker-compose exec web python manage.py migrate
```

### 4. Create Superuser
```bash
docker-compose exec web python manage.py createsuperuser
```

### 5. Access the Application
- Frontend: http://localhost:8000
- Admin: http://localhost:8000/admin
- API: http://localhost:8000/api

## Common Commands

### Start services
```bash
docker-compose up
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f web
```

### Run Django commands
```bash
docker-compose exec web python manage.py <command>
```

### Create migrations
```bash
docker-compose exec web python manage.py makemigrations
```

### Apply migrations
```bash
docker-compose exec web python manage.py migrate
```

### Collect static files
```bash
docker-compose exec web python manage.py collectstatic
```

### Run tests
```bash
docker-compose exec web python manage.py test
```

### Access database shell
```bash
docker-compose exec db psql -U nexcart -d nexcart
```

### Access Redis CLI
```bash
docker-compose exec redis redis-cli
```

## Environment Variables

Edit `docker-compose.yml` to change:
- Database credentials
- Django SECRET_KEY
- DEBUG mode
- ALLOWED_HOSTS
- CORS_ALLOWED_ORIGINS

## Production Deployment

1. Set DEBUG=False
2. Generate a strong SECRET_KEY
3. Use PostgreSQL instead of SQLite
4. Configure proper ALLOWED_HOSTS
5. Set up SSL/HTTPS
6. Use environment variables for sensitive data
7. Set up proper logging
8. Configure backups

## Troubleshooting

### Database connection error
```bash
docker-compose down
docker-compose up --build
```

### Port already in use
Change ports in docker-compose.yml

### Permission errors
```bash
sudo chown -R $USER:$USER .
```

## Performance Optimization

- Use production-grade database (PostgreSQL)
- Enable Redis caching
- Use CDN for static files
- Enable gzip compression
- Use nginx as reverse proxy
- Monitor with application monitoring tools

## Security Considerations

- Change all default credentials
- Enable HTTPS in production
- Use strong SECRET_KEY
- Keep dependencies updated
- Implement rate limiting
- Enable CSRF protection
- Use secure cookies
- Implement proper authentication

## Further Reading

- Docker: https://docs.docker.com/
- Django: https://docs.djangoproject.com/
- PostgreSQL: https://www.postgresql.org/docs/
