const API_BASE_URL = 'http://localhost:8000/api';

let allCategories = [];

// Load categories
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories/`);
        const data = await response.json();
        
        allCategories = data.results || [];
        
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.innerHTML = '<option value="">All Categories</option>' +
                allCategories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Load products
async function loadProducts(filters = {}) {
    try {
        let url = `${API_BASE_URL}/products/?`;
        
        if (filters.category) url += `category=${filters.category}&`;
        if (filters.search) url += `search=${filters.search}&`;
        if (filters.sort) url += `ordering=${filters.sort}&`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        const container = document.getElementById('products-list');
        if (!container) return;
        
        if (data.results.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
            return;
        }
        
        container.innerHTML = data.results.map(product => `
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
        console.error('Error loading products:', error);
    }
}

// Add to cart
async function addToCart(productId) {
    const token = localStorage.getItem('auth_token');
    if (!token) {
        window.location.href = '/login';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders/cart/add_item/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: 1
            })
        });
        
        if (response.ok) {
            alert('Product added to cart!');
        } else {
            alert('Failed to add product to cart.');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
    
    const searchBox = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort');
    
    let searchTimeout;
    
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                loadProducts({
                    search: e.target.value,
                    category: categoryFilter.value,
                    sort: sortFilter.value
                });
            }, 300);
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            loadProducts({
                search: searchBox.value,
                category: e.target.value,
                sort: sortFilter.value
            });
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            loadProducts({
                search: searchBox.value,
                category: categoryFilter.value,
                sort: e.target.value
            });
        });
    }
});
