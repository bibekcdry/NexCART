const API_BASE_URL = 'http://localhost:8000/api';

// Handle login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch(`${API_BASE_URL}/users/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('auth_token', 'your-token');
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Login successful!');
                    window.location.href = '/';
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Login failed');
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const password_confirm = document.getElementById('password_confirm').value;
            const first_name = document.getElementById('first_name').value;
            const last_name = document.getElementById('last_name').value;
            const role = document.getElementById('role').value;
            
            if (password !== password_confirm) {
                alert('Passwords do not match');
                return;
            }
            
            try {
                const response = await fetch(`${API_BASE_URL}/users/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        password_confirm,
                        first_name,
                        last_name,
                        role
                    })
                });
                
                if (response.ok) {
                    alert('Registration successful! Please login.');
                    window.location.href = '/login';
                } else {
                    const data = await response.json();
                    alert(JSON.stringify(data));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Registration failed');
            }
        });
    }
});
