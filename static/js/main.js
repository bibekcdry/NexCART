// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Get auth token from localStorage
function getAuthToken() {
    return localStorage.getItem('auth_token');
}

// Set auth token
function setAuthToken(token) {
    localStorage.setItem('auth_token', token);
}

// Clear auth token
function clearAuthToken() {
    localStorage.removeItem('auth_token');
}

// Fetch with authentication
function fetchWithAuth(url, options = {}) {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return fetch(url, {
        ...options,
        headers
    });
}

// Load and display featured products
async function loadFeaturedProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products/?is_featured=true`);
        const products = await response.json();
        
        const container = document.getElementById('featured-products');
        if (!container) return;
        
        container.innerHTML = products.results.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-vendor">${product.vendor_name}</div>
                    <div class="product-price">
                        <span class="price">Rs. ${product.discount_price || product.price}</span>
                        ${product.discount_price ? `<span class="discount-price">Rs. ${product.price}</span>` : ''}
                        ${product.discount_percentage ? `<span class="discount-badge">${product.discount_percentage}% OFF</span>` : ''}
                    </div>
                    <div class="product-rating">
                        <span class="stars">${'★'.repeat(Math.round(product.rating))}</span>
                        (${product.reviews_count} reviews)
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading featured products:', error);
    }
}

// Add to cart
async function addToCart(productId) {
    const token = getAuthToken();
    if (!token) {
        window.location.href = '/login';
        return;
    }
    
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/orders/cart/add_item/`, {
            method: 'POST',
            body: JSON.stringify({
                product_id: productId,
                quantity: 1
            })
        });
        
        if (response.ok) {
            alert('Product added to cart!');
            updateCartCount();
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Update cart count
async function updateCartCount() {
    const token = getAuthToken();
    if (!token) return;
    
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/orders/cart/my_cart/`);
        const cart = await response.json();
        
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(el => {
            el.textContent = cart.total_items || 0;
        });
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Load cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadFeaturedProducts();
});
