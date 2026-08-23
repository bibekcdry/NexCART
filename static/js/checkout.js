const API_BASE_URL = 'http://localhost:8000/api';

function getAuthToken() {
    return localStorage.getItem('auth_token');
}

let selectedAddressId = null;

// Load saved addresses
async function loadAddresses() {
    const token = getAuthToken();
    if (!token) {
        window.location.href = '/login';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/addresses/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const addresses = await response.json();
            displayAddresses(addresses.results || []);
        }
    } catch (error) {
        console.error('Error loading addresses:', error);
    }
}

// Display addresses
function displayAddresses(addresses) {
    const container = document.getElementById('saved-addresses');
    
    if (addresses.length === 0) {
        container.innerHTML = '<p>No saved addresses</p>';
        return;
    }
    
    container.innerHTML = addresses.map(address => `
        <label class="address-option">
            <input type="radio" name="address" value="${address.id}" ${address.is_default ? 'checked' : ''}>
            <div class="address-info">
                <strong>${address.full_name}</strong><br>
                ${address.street_address}<br>
                ${address.city}, ${address.state} ${address.zip_code}<br>
                ${address.country}
            </div>
        </label>
    `).join('');
    
    // Set the first or default address as selected
    if (addresses.length > 0) {
        const defaultAddress = addresses.find(a => a.is_default);
        selectedAddressId = defaultAddress ? defaultAddress.id : addresses[0].id;
    }
    
    // Add event listeners to address radio buttons
    document.querySelectorAll('input[name="address"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedAddressId = parseInt(e.target.value);
        });
    });
}

// Load cart items for review
async function loadCartItems() {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_BASE_URL}/orders/cart/my_cart/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const cart = await response.json();
            displayOrderItems(cart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// Display order items for review
function displayOrderItems(cart) {
    const container = document.getElementById('order-items');
    
    container.innerHTML = cart.items.map(item => `
        <div class="order-item-summary">
            <div class="item-name">${item.product_details.name}</div>
            <div class="item-details">
                <span>${item.quantity} x Rs. ${item.price}</span>
                <span class="item-subtotal">Rs. ${item.total_price}</span>
            </div>
        </div>
    `).join('');
    
    // Update summary
    const subtotal = cart.total_price || 0;
    const tax = subtotal * 0.13;
    const shipping = 50;
    const total = subtotal + tax + shipping;
    
    document.getElementById('summary-subtotal').textContent = `Rs. ${subtotal}`;
    document.getElementById('summary-tax').textContent = `Rs. ${tax.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `Rs. ${total.toFixed(2)}`;
}

// Handle new address toggle
document.addEventListener('DOMContentLoaded', () => {
    const useNewAddressCheckbox = document.getElementById('use-new-address');
    const newAddressForm = document.getElementById('new-address-form');
    
    if (useNewAddressCheckbox) {
        useNewAddressCheckbox.addEventListener('change', (e) => {
            newAddressForm.style.display = e.target.checked ? 'block' : 'none';
        });
    }
    
    loadAddresses();
    loadCartItems();
    
    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const token = getAuthToken();
            const payment_method = document.querySelector('input[name="payment_method"]:checked').value;
            const notes = document.getElementById('notes').value;
            const useNewAddress = document.getElementById('use-new-address').checked;
            
            let shipping_address_id = selectedAddressId;
            
            // If using new address, create it first
            if (useNewAddress) {
                const addressData = {
                    full_name: document.getElementById('full_name').value,
                    phone: document.getElementById('phone').value,
                    street_address: document.getElementById('street_address').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zip_code: document.getElementById('zip_code').value,
                    country: document.getElementById('country').value,
                    is_default: false,
                    is_shipping: true
                };
                
                try {
                    const addressResponse = await fetch(`${API_BASE_URL}/users/addresses/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(addressData)
                    });
                    
                    if (addressResponse.ok) {
                        const newAddress = await addressResponse.json();
                        shipping_address_id = newAddress.id;
                    } else {
                        alert('Failed to create address');
                        return;
                    }
                } catch (error) {
                    console.error('Error creating address:', error);
                    alert('Error creating address');
                    return;
                }
            }
            
            // Create order
            try {
                const orderResponse = await fetch(`${API_BASE_URL}/orders/orders/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        shipping_address_id: shipping_address_id,
                        payment_method: payment_method,
                        notes: notes
                    })
                });
                
                if (orderResponse.ok) {
                    const order = await orderResponse.json();
                    alert('Order placed successfully!');
                    // Redirect to order confirmation page
                    window.location.href = `/order-confirmation?order_id=${order.id}`;
                } else {
                    const error = await orderResponse.json();
                    alert(`Error: ${error.error || 'Failed to place order'}`);
                }
            } catch (error) {
                console.error('Error placing order:', error);
                alert('Error placing order');
            }
        });
    }
});
