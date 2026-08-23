const API_BASE_URL = 'http://localhost:8000/api';

function getAuthToken() {
    return localStorage.getItem('auth_token');
}

// Load cart
async function loadCart() {
    const token = getAuthToken();
    if (!token) {
        window.location.href = '/login';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders/cart/my_cart/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const cart = await response.json();
            displayCart(cart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// Display cart
function displayCart(cart) {
    const container = document.getElementById('cart-items-list');
    
    if (!cart.items || cart.items.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <a href="/products" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <img src="${item.product_details.image}" alt="${item.product_details.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.product_details.name}</div>
                <div class="cart-item-price">Rs. ${item.price}</div>
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.product}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.product}, ${item.quantity + 1})">+</button>
                </div>
                <div>Subtotal: Rs. ${item.total_price}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.product})">Remove</button>
            </div>
        </div>
    `).join('');
    
    // Update summary
    const subtotal = cart.total_price || 0;
    const tax = subtotal * 0.13;
    const shipping = 50;
    const total = subtotal + tax + shipping;
    
    document.getElementById('subtotal').textContent = `Rs. ${subtotal}`;
    document.getElementById('tax').textContent = `Rs. ${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `Rs. ${total.toFixed(2)}`;
}

// Update quantity
async function updateQuantity(productId, quantity) {
    if (quantity < 1) return;
    
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_BASE_URL}/orders/cart/update_item/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity
            })
        });
        
        if (response.ok) {
            loadCart();
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

// Remove from cart
async function removeFromCart(productId) {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_BASE_URL}/orders/cart/remove_item/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: productId
            })
        });
        
        if (response.ok) {
            loadCart();
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

// Proceed to checkout
function proceedToCheckout() {
    const token = getAuthToken();
    if (!token) {
        window.location.href = '/login';
        return;
    }
    
    window.location.href = '/checkout';
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});
