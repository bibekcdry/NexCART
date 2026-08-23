# Contributing Guidelines

Thank you for your interest in contributing to NexCart! Please follow these guidelines:

## Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add AmazingFeature'`)
5. Push to branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Development Setup

```bash
git clone https://github.com/yourusername/NexCART.git
cd NexCART
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Code Standards

- Follow PEP 8 for Python code
- Use meaningful variable and function names
- Add comments for complex logic
- Write tests for new features
- Keep commits atomic and well-documented

## Pull Request Process

1. Update README.md with any new features
2. Update requirements.txt if adding dependencies
3. Ensure all tests pass
4. Provide clear PR description
5. Reference related issues

## Reporting Issues

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (Python version, OS, etc.)

## Feature Requests

Provide:
- Clear description of the feature
- Use cases
- Proposed implementation approach
- Alternative solutions considered

## Code Review

All PRs will be reviewed for:
- Code quality
- Test coverage
- Documentation
- Performance impact
- Security considerations

## Questions?

Open an issue or email support@nexcart.com

Thank you for contributing! 🚀
