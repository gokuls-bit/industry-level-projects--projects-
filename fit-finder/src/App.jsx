import React, { useState, useEffect } from 'react';
import './app.css'; // Ensure this path is correct

// --- Utility Functions and Mock Data ---

// Helper for generating unique product IDs
let productIdCounter = 1;

/**
 * Generates a mock product with random details.
 * @param {string} category - The category of the product (men, women, kids, accessories).
 * @returns {object} A mock product object.
 */
const generateMockProduct = (category) => {
    const productsBase = {
        men: [
            { name: 'Athletic Running Shoes', price: 89.99, imageUrl: 'https://source.unsplash.com/300x300/?mens-shoes,sneakers' },
            { name: 'Performance Sports T-Shirt', price: 29.99, imageUrl: 'https://source.unsplash.com/300x300/?mens-tshirt,sport' },
            { name: 'Slim Fit Joggers', price: 49.99, imageUrl: 'https://source.unsplash.com/300x300/?mens-joggers,activewear' },
            { name: 'Waterproof Running Jacket', price: 99.99, imageUrl: 'https://source.unsplash.com/300x300/?mens-jacket,running' },
            { name: 'Compression Shorts', price: 24.50, imageUrl: 'https://source.unsplash.com/300x300/?mens-shorts,compression' },
            { name: 'Basketball Jersey', price: 39.00, imageUrl: 'https://source.unsplash.com/300x300/?mens-jersey,basketball' },
            { name: 'Golf Polo Shirt', price: 45.99, imageUrl: 'https://source.unsplash.com/300x300/?mens-polo,golf' },
            { name: 'Trail Hiking Boots', price: 119.00, imageUrl: 'https://source.unsplash.com/300x300/?mens-boots,hiking' },
            { name: 'Gym Duffel Bag', price: 55.00, imageUrl: 'https://source.unsplash.com/300x300/?mens-bag,gym' },
            { name: 'Fitness Tracker Watch', price: 129.99, imageUrl: 'https://source.unsplash.com/300x300/?fitness-watch,mens-accessories' },
        ],
        women: [
            { name: 'High-Waisted Yoga Leggings', price: 45.00, imageUrl: 'https://source.unsplash.com/300x300/?womens-leggings,yoga' },
            { name: 'Supportive Sports Bra', price: 28.00, imageUrl: 'https://source.unsplash.com/300x300/?womens-sports-bra,fitness' },
            { name: 'Breathable Running Tank', price: 22.00, imageUrl: 'https://source.unsplash.com/300x300/?womens-tank-top,running' },
            { name: 'Stylish Athletic Skirt', price: 38.00, imageUrl: 'https://source.unsplash.com/300x300/?womens-skirt,tennis' },
            { name: 'Lightweight Windbreaker', price: 75.00, imageUrl: 'https://source.unsplash.com/300x300/?womens-windbreaker,sport' },
            { name: 'Cross-Training Sneakers', price: 70.00, imageUrl: 'https://source.unsplash.com/300x300/?womens-sneakers,training' },
            { name: 'Cozy Fleece Hoodie', price: 55.00, imageUrl: 'https://source.unsplash.com/300x300/?womens-hoodie,casual' },
            { name: 'Seamless Cycling Shorts', price: 32.00, imageUrl: 'https://source.unsplash.com/300x300/?womens-shorts,cycling' },
            { name: 'Insulated Winter Jacket', price: 130.00, imageUrl: 'https://source.unsplash.com/300x300/?womens-winter-jacket,cold-weather' },
            { name: 'Water Bottle with Infuser', price: 18.00, imageUrl: 'https://source.unsplash.com/300x300/?water-bottle,infuser' },
        ],
        kids: [
            { name: 'Kids\' Playful T-Shirt', price: 15.00, imageUrl: 'https://source.unsplash.com/300x300/?kids-tshirt,play' },
            { name: 'Durable Sports Shorts', price: 18.00, imageUrl: 'https://source.unsplash.com/300x300/?kids-shorts,sport' },
            { name: 'Comfortable Jogger Pants', price: 25.00, imageUrl: 'https://source.unsplash.com/300x300/?kids-joggers,casual' },
            { name: 'Colorful Trainers', price: 35.00, imageUrl: 'https://source.unsplash.com/300x300/?kids-trainers,sneakers' },
            { name: 'Lightweight Hoodie', price: 30.00, imageUrl: 'https://source.unsplash.com/300x300/?kids-hoodie,youth' },
            { name: 'Swim Trunks for Boys', price: 20.00, imageUrl: 'https://source.unsplash.com/300x300/?boys-swim-trunks,beach' },
            { name: 'Girls\' Athletic Dress', price: 28.00, imageUrl: 'https://source.unsplash.com/300x300/?girls-dress,sporty' },
            { name: 'Kids\' Backpack (Adventure Series)', price: 40.00, imageUrl: 'https://source.unsplash.com/300x300/?kids-backpack,school' },
            { name: 'Unisex Sports Socks (5-Pack)', price: 12.00, imageUrl: 'https://source.unsplash.com/300x300/?kids-socks,sport' },
            { name: 'Winter Beanie Hat', price: 10.00, imageUrl: 'https://source.unsplash.com/300x300/?kids-hat,winter' },
        ],
        accessories: [
            { name: 'Smart Fitness Scale', price: 79.00, imageUrl: 'https://source.unsplash.com/300x300/?smart-scale,fitness' },
            { name: 'Resistance Bands Set', price: 25.00, imageUrl: 'https://source.unsplash.com/300x300/?resistance-bands,workout' },
            { name: 'Yoga Mat (Eco-Friendly)', price: 35.00, imageUrl: 'https://source.unsplash.com/300x300/?yoga-mat,eco' },
            { name: 'Protein Shaker Bottle', price: 10.00, imageUrl: 'https://source.unsplash.com/300x300/?shaker-bottle,protein' },
            { name: 'Weighted Jump Rope', price: 15.00, imageUrl: 'https://source.unsplash.com/300x300/?jump-rope,weighted' },
            { name: 'Gym Gloves (Anti-Slip)', price: 20.00, imageUrl: 'https://source.unsplash.com/300x300/?gym-gloves,workout' },
            { name: 'Foam Roller (Deep Tissue)', price: 28.00, imageUrl: 'https://source.unsplash.com/300x300/?foam-roller,recovery' },
            { name: 'Headband & Wristband Set', price: 9.00, imageUrl: 'https://source.unsplash.com/300x300/?headband,wristband' },
            { name: 'Massage Ball Set', price: 18.00, imageUrl: 'https://source.unsplash.com/300x300/?massage-ball,therapy' },
            { name: 'Sport Sunglasses', price: 49.00, imageUrl: 'https://source.unsplash.com/300x300/?sunglasses,sport' },
        ]
    };

    const specificProducts = productsBase[category];
    const randomIndex = Math.floor(Math.random() * specificProducts.length);
    const chosenProduct = specificProducts[randomIndex];

    return {
        id: `prod-${productIdCounter++}`,
        name: chosenProduct.name,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        price: chosenProduct.price,
        image: chosenProduct.imageUrl,
    };
};

// Generate 65 diverse products
const generateAllProducts = () => {
    const allProducts = [];
    const categories = ['men', 'women', 'kids', 'accessories'];
    const productsPerCategory = Math.ceil(65 / categories.length);

    for (let i = 0; i < productsPerCategory; i++) {
        categories.forEach(category => {
            if (allProducts.length < 65) {
                allProducts.push(generateMockProduct(category));
            }
        });
    }
    return allProducts;
};

const MOCK_ALL_PRODUCTS = generateAllProducts();

// --- Components (All contained in App.jsx) ---

// === Navbar Component ===
function Navbar({ isLoggedIn, onLogout, cartItemCount, onNavLinkClick }) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand" onClick={() => onNavLinkClick('home')}>Fit-Finder</div>
                <div className="navbar-links">
                    <button className="nav-button" onClick={() => onNavLinkClick('home')}>Home</button>
                    {isLoggedIn && (
                        <>
                            <button className="nav-button" onClick={() => onNavLinkClick('dashboard')}>Shop</button>
                            <button className="nav-button" onClick={() => onNavLinkClick('wishlist')}>Wishlist</button>
                            <button className="nav-icon-button" onClick={() => onNavLinkClick('checkout')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                {cartItemCount > 0 && <span className="nav-count-badge cart-badge">{cartItemCount}</span>}
                            </button>
                            <button className="logout-button neom-button" onClick={onLogout}>Logout</button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <button className="nav-button neom-button" onClick={() => onNavLinkClick('auth')}>Login / Signup</button>
                    )}
                </div>
            </div>
        </nav>
    );
}

// === AuthPage Component (Login/Signup) ===
function AuthPage({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adminSecretCode, setAdminSecretCode] = useState(''); // New state for admin secret code
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'error' or 'success'

    // Define the default user password and admin secret code
    const DEFAULT_USER_PASSWORD = 'password123';
    const ADMIN_SECRET_CODE = '134003';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');

        console.log('AuthPage: Attempting to submit:', { email, password, isLogin, adminSecretCode }); // DEBUG LOG

        if (isLogin) {
            // Login Logic
            if (!email || !password) {
                setMessage('Please enter both email and password.');
                setMessageType('error');
                console.log('AuthPage: Login error - Missing credentials.'); // DEBUG LOG
                return;
            }

            // Check for Admin Login
            if (email === 'admin@example.com') {
                if (password === DEFAULT_USER_PASSWORD && adminSecretCode === ADMIN_SECRET_CODE) {
                    setMessage('Admin Login successful!');
                    setMessageType('success');
                    onLoginSuccess('admin');
                    console.log('AuthPage: Login successful - Admin.'); // DEBUG LOG
                } else {
                    setMessage('Invalid admin credentials or secret code.');
                    setMessageType('error');
                    console.log('AuthPage: Admin login error - Invalid credentials.'); // DEBUG LOG
                }
            }
            // Check for Regular User Login
            else if (email === 'user@example.com' && password === DEFAULT_USER_PASSWORD) {
                setMessage('Login successful!');
                setMessageType('success');
                onLoginSuccess('customer');
                console.log('AuthPage: Login successful - Customer.'); // DEBUG LOG
            } else {
                setMessage('Invalid email or password.');
                setMessageType('error');
                console.log('AuthPage: Login error - Invalid credentials.'); // DEBUG LOG
            }
        } else {
            // Signup Logic (simplified, always creates a regular user for this mock)
            if (!email || !password || !confirmPassword) {
                setMessage('All fields are required.');
                setMessageType('error');
                console.log('AuthPage: Signup error - Missing fields.'); // DEBUG LOG
                return;
            }
            if (password.length < 6) {
                setMessage('Password must be at least 6 characters long.');
                setMessageType('error');
                console.log('AuthPage: Signup error - Password too short.'); // DEBUG LOG
                return;
            }
            if (password !== confirmPassword) {
                setMessage('Passwords do not match.');
                setMessageType('error');
                console.log('AuthPage: Signup error - Passwords mismatch.'); // DEBUG LOG
                return;
            }
            // Simulate API call for signup
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
            setMessage('Account created successfully! Please log in.');
            setMessageType('success');
            setIsLogin(true); // Switch to login after successful signup
            setEmail(''); // Clear form
            setPassword('');
            setConfirmPassword('');
            setAdminSecretCode(''); // Clear admin code on signup
            console.log('AuthPage: Signup successful. Switching to login view.'); // DEBUG LOG
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card-container">
                <div className="auth-image-side">
                    <h3>Fit-Finder</h3>
                    <p>{isLogin ? "Your journey to fitness starts here. Log in to explore!" : "Join the Fit-Finder community and elevate your style."}</p>
                </div>
                <div className="auth-form-side">
                    <h2 className="auth-title">{isLogin ? 'Login' : 'Sign Up'}</h2>

                    {message && (
                        <div className={`${messageType}-message mb-4`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="your@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {isLogin && email === 'user@example.com' && (
                                <p className="hint-text">Hint: Use '{DEFAULT_USER_PASSWORD}' for regular login.</p>
                            )}
                        </div>

                        {isLogin && email === 'admin@example.com' && (
                            <div className="form-group">
                                <label htmlFor="adminSecretCode" className="form-label">Admin Secret Code</label>
                                <input
                                    type="password"
                                    id="adminSecretCode"
                                    className="form-input"
                                    placeholder="Enter admin secret code"
                                    value={adminSecretCode}
                                    onChange={(e) => setAdminSecretCode(e.target.value)}
                                    required
                                />
                                <p className="hint-text">Secret Code for Admin: {ADMIN_SECRET_CODE}</p>
                            </div>
                        )}


                        {!isLogin && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="form-input"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Removed userType radio buttons as signup will default to customer for simplicity in mock */}
                            </>
                        )}

                        <button type="submit" className="auth-submit-button">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="auth-alternative"></div>

                    <div className="social-login-buttons">
                        <button className="social-login-button" aria-label="Login with Google">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.232v3.528h6.16c-.252 1.488-.936 2.76-2.112 3.564v2.304h2.952c1.728-1.584 2.724-3.924 2.724-6.72 0-.48-.048-.96-.12-1.416h-1.044z" fill="#4285F4"/><path d="M12.24 21.6c3.192 0 5.868-1.044 7.824-2.82l-2.952-2.304c-1.128.768-2.58 1.224-4.872 1.224-4.224 0-7.788-2.88-9.072-6.768h-3.072v2.352c1.392 3.6 4.908 6.216 9.24 6.216z" fill="#34A853"/><path d="M3.168 12.008c0-.756.12-1.5.348-2.196v-2.352h-3.072c-.672 1.344-.996 2.892-.996 4.548 0 1.656.324 3.204.996 4.548h3.072v-2.352c-.228-.696-.348-1.44-.348-2.196z" fill="#FBBC05"/><path d="M12.24 3.032c2.256 0 3.984.864 4.896 1.764l2.508-2.436c-1.572-1.44-3.648-2.328-7.404-2.328-4.332 0-7.848 2.616-9.24 6.216h3.072c1.284-3.888 4.848-6.768 9.072-6.768z" fill="#EA4335"/></svg>
                        </button>
                        <button className="social-login-button" aria-label="Login with Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17 2H15C12.24 2 10 4.24 10 7v3H7v4h3v8h4v-8h3l1-4h-4V7c0-.55.45-1 1-1h3V2z"/></svg>
                        </button>
                        <button className="social-login-button" aria-label="Login with Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.34-1.6.58-2.48.69.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.73 1.05C18.42 4.6 17.27 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.56 9.29 5.28 7.5 3.06 4.6l-.88-1.73c-.92 1.56-1.43 3.39-1.43 5.37 0 1.25.26 2.45.72 3.53-.7.03-1.35-.19-1.93-.53-.02.66.19 1.28.56 1.83.58.9 1.48 1.56 2.56 1.81-.27.07-.55.11-.83.11-.2 0-.39-.02-.58-.05.8 2.05 2.53 3.53 4.5 3.57C7.15 19.89 5.34 20.5 3 20.5c-.48 0-.95-.03-1.4-.08 2.37 1.53 5.18 2.42 8.13 2.42 9.77 0 15.1-8.58 15.1-16.03 0-.24-.01-.48-.02-.72.84-.6 1.56-1.35 2.14-2.2z"/></svg>
                        </button>
                    </div>

                    <div className="login-signup-toggle">
                        {isLogin ? (
                            <>
                                Don't have an account? <a href="#" onClick={() => { setIsLogin(false); setMessage(''); setMessageType(''); }}>Sign Up</a>
                            </>
                        ) : (
                            <>
                                Already have an account? <a href="#" onClick={() => { setIsLogin(true); setMessage(''); setMessageType(''); }}>Login</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// === HomePage / UserDashboard Components ===
function HomePage({ products, onAddToCart, onAddToWishlist, onNavigate }) {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category.toLowerCase() === activeCategory);

    return (
        <>
            <HeroSection onShopNowClick={() => onNavigate('dashboard')} />
            <section className="product-grid-section container">
                <h2 className="section-title text-center mb-4">Explore Our Collection</h2>
                <div className="product-categories">
                    <button
                        className={`category-button neom-button ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                    >
                        All Products
                    </button>
                    <button
                        className={`category-button neom-button ${activeCategory === 'men' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('men')}
                    >
                        Men's
                    </button>
                    <button
                        className={`category-button neom-button ${activeCategory === 'women' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('women')}
                    >
                        Women's
                    </button>
                    <button
                        className={`category-button neom-button ${activeCategory === 'kids' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('kids')}
                    >
                        Kids'
                    </button>
                    <button
                        className={`category-button neom-button ${activeCategory === 'accessories' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('accessories')}
                    >
                        Accessories
                    </button>
                </div>
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={onAddToCart}
                                onAddToWishlist={onAddToWishlist}
                            />
                        ))
                    ) : (
                        <p className="no-products-message">No products found in this category.</p>
                    )}
                </div>
            </section>
        </>
    );
}

// === HeroSection Component ===
function HeroSection({ onShopNowClick }) {
    return (
        <section className="hero-section container">
            <h1 className="hero-title">Unleash Your Potential</h1>
            <p className="hero-subtitle">
                Discover premium athletic wear and gear for every lifestyle.
            </p>
            <button className="shop-now-button" onClick={onShopNowClick}>
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
        </section>
    );
}

// === ProductCard Component ===
function ProductCard({ product, onAddToCart, onAddToWishlist }) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/3a3a3a/e0e0e0?text=Image+Error"; }} />
            <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-actions">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <div className="action-buttons">
                        <button
                            className="action-button wishlist-btn"
                            onClick={() => onAddToWishlist(product)}
                            aria-label="Add to Wishlist"
                            title="Add to Wishlist"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                        <button
                            className="action-button add-to-cart-btn"
                            onClick={() => onAddToCart(product)}
                            aria-label="Add to Cart"
                            title="Add to Cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// === WishlistPage Component ===
function WishlistPage({ wishlist, onAddToCart, onRemoveFromWishlist }) {
    return (
        <div className="wishlist-page container">
            <h2 className="section-title text-center mb-4">My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p className="no-products-message">Your wishlist is empty. Start adding some items!</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map(item => (
                        <div key={item.id} className="wishlist-item-card">
                            <img src={item.image} alt={item.name} className="wishlist-item-image" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/3a3a3a/e0e0e0?text=Img"; }}/>
                            <div className="wishlist-item-details">
                                <h3 className="wishlist-item-name">{item.name}</h3>
                                <p className="wishlist-item-price">${item.price.toFixed(2)}</p>
                                <div className="wishlist-item-actions">
                                    <button
                                        className="wishlist-button add-to-cart neom-button"
                                        onClick={() => onAddToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="wishlist-button remove neom-button"
                                        onClick={() => onRemoveFromWishlist(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// === CheckoutPage Component ===
function CheckoutPage({ cart, onRemoveFromCart, onUpdateCartItemQuantity, onProceedToPayment }) {
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        email: '',
        phone: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleProceed = () => {
        if (cart.length === 0) {
            setMessage('Your cart is empty. Please add items to proceed.');
            setMessageType('error');
            return;
        }

        const requiredFields = ['fullName', 'addressLine1', 'city', 'state', 'zipCode', 'country', 'email'];
        const allFieldsFilled = requiredFields.every(field => shippingInfo[field].trim() !== '');

        if (!allFieldsFilled) {
            setMessage('Please fill in all required shipping information.');
            setMessageType('error');
            return;
        }

        setMessage('');
        setMessageType('');
        onProceedToPayment();
    };

    return (
        <div className="checkout-page container">
            <h2 className="section-title text-center mb-4">Your Shopping Cart</h2>
            <div className="checkout-grid">
                <div className="cart-summary-section">
                    <h3 className="cart-summary-title">Order Summary</h3>
                    {cart.length === 0 ? (
                        <p className="no-products-message">Your cart is empty.</p>
                    ) : (
                        <>
                            <div className="cart-items-list">
                                {cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-details-wrapper">
                                            <img src={item.image} alt={item.name} className="cart-item-image" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/3a3a3a/e0e0e0?text=Img"; }}/>
                                            <div className="cart-item-info">
                                                <span className="cart-item-name">{item.name}</span>
                                                <span className="cart-item-price">${item.price.toFixed(2)}</span>
                                                <div className="quantity-controls">
                                                    <button
                                                        className="quantity-button neom-button"
                                                        onClick={() => onUpdateCartItemQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >-</button>
                                                    <span className="quantity-display">{item.quantity}</span>
                                                    <button
                                                        className="quantity-button neom-button"
                                                        onClick={() => onUpdateCartItemQuantity(item.id, item.quantity + 1)}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="remove-item-button neom-button"
                                            onClick={() => onRemoveFromCart(item.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total">
                                <strong>Total:</strong> ${calculateTotal().toFixed(2)}
                            </div>
                        </>
                    )}
                </div>

                <div className="shipping-info-section">
                    <h3 className="shipping-info-title">Shipping Information</h3>
                    {message && (
                        <div className={`${messageType}-message mb-4`}>
                            {message}
                        </div>
                    )}
                    <form className="shipping-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addressLine1">Address Line 1</label>
                            <input type="text" id="addressLine1" name="addressLine1" value={shippingInfo.addressLine1} onChange={handleShippingChange} className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
                            <input type="text" id="addressLine2" name="addressLine2" value={shippingInfo.addressLine2} onChange={handleShippingChange} className="form-input" />
                        </div>
                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State / Province</label>
                                <input type="text" id="state" name="state" value={shippingInfo.state} onChange={handleShippingChange} className="form-input" required />
                            </div>
                        </div>
                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="zipCode">Zip / Postal Code</label>
                                <input type="text" id="zipCode" name="zipCode" value={shippingInfo.zipCode} onChange={handleShippingChange} className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input type="text" id="country" name="country" value={shippingInfo.country} onChange={handleShippingChange} className="form-input" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={shippingInfo.email} onChange={handleShippingChange} className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number (Optional)</label>
                            <input type="tel" id="phone" name="phone" value={shippingInfo.phone} onChange={handleShippingChange} className="form-input" />
                        </div>
                    </form>
                    <button className="proceed-to-payment-button neom-button" onClick={handleProceed}>Proceed to Payment</button>
                </div>
            </div>
        </div>
    );
}


// === PaymentPage Component (NEW) ===
function PaymentPage({ onPaymentResult }) {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failure', null
    const [message, setMessage] = useState('');

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setPaymentStatus(null);
        setIsLoading(true);

        // Basic validation (can be expanded)
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
            setMessage('Please fill in all payment details.');
            setIsLoading(false);
            return;
        }

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay

        const isSuccess = Math.random() > 0.3; // 70% chance of success for demonstration

        if (isSuccess) {
            setPaymentStatus('success');
            setMessage('Payment Successful!');
        } else {
            setPaymentStatus('failure');
            setMessage('Payment Failed. Please try again.');
        }
        setIsLoading(false);
        onPaymentResult(isSuccess); // Communicate result back to App component
    };

    // Render the animation based on payment status
    const renderAnimation = () => {
        if (paymentStatus === 'success') {
            return (
                <div className="payment-animation success">
                    <div className="rocket-container">
                        <div className="rocket">🚀</div>
                        <div className="smoke"></div>
                    </div>
                    <div className="pop-splash green">Successful!</div>
                </div>
            );
        } else if (paymentStatus === 'failure') {
            return (
                <div className="payment-animation failure">
                    <div className="pop-splash red">Not Successful</div>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="payment-page container">
            <h2 className="section-title text-center mb-4">Complete Your Payment</h2>
            <div className="payment-form-container">
                {renderAnimation()} {/* Render the animation here */}

                {!isLoading && !paymentStatus && ( // Only show form if not loading and no payment status yet
                    <form onSubmit={handlePaymentSubmit} className="payment-form">
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                className="form-input"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))} // Only digits, max 16
                                placeholder="•••• •••• •••• ••••"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardName">Name on Card</label>
                            <input
                                type="text"
                                id="cardName"
                                className="form-input"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    className="form-input"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d{2})/, '$1/$2'))} // MM/YY format
                                    placeholder="MM/YY"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    className="form-input"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} // Only digits, max 4
                                    placeholder="•••"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="payment-submit-button neom-button" disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Pay Now'}
                        </button>
                    </form>
                )}

                {message && !isLoading && (
                    <div className={`payment-message ${paymentStatus === 'success' ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
                {paymentStatus && (
                    <button className="neom-button back-to-shop-button" onClick={() => onPaymentResult(paymentStatus === 'success')}>
                        {paymentStatus === 'success' ? 'Continue Shopping' : 'Try Again'}
                    </button>
                )}
            </div>
        </div>
    );
}


// === AdminDashboard Component ===
function AdminDashboard({ products }) {
    const [adminProducts, setAdminProducts] = useState(products);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState({ id: '', name: '', category: '', price: '', image: '' });

    useEffect(() => {
        setAdminProducts(products);
    }, [products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = () => {
        if (!form.name || !form.category || !form.price || !form.image) {
            alert('Please fill all fields to add a product.');
            return;
        }
        const newProduct = {
            id: `prod-${productIdCounter++}`, // Simple ID generation
            name: form.name,
            category: form.category,
            price: parseFloat(form.price),
            image: form.image,
        };
        setAdminProducts(prev => [...prev, newProduct]);
        setForm({ id: '', name: '', category: '', price: '', image: '' }); // Reset form
    };

    const handleEditClick = (product) => {
        setEditingProduct(product.id);
        setForm(product);
    };

    const handleUpdateProduct = () => {
        if (!form.name || !form.category || !form.price || !form.image) {
            alert('Please fill all fields to update a product.');
            return;
        }
        setAdminProducts(prev =>
            prev.map(p => (p.id === editingProduct ? { ...form, price: parseFloat(form.price) } : p))
        );
        setEditingProduct(null);
        setForm({ id: '', name: '', category: '', price: '', image: '' });
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setAdminProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    return (
        <div className="admin-dashboard container">
            <h2 className="section-title text-center mb-4">Admin Dashboard</h2>

            {/* Product Management Form */}
            <div className="admin-form-section neom-card">
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input type="text" name="category" value={form.category} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" value={form.price} onChange={handleInputChange} className="form-input" step="0.01" />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" name="image" value={form.image} onChange={handleInputChange} className="form-input" />
                </div>
                {editingProduct ? (
                    <button className="neom-button primary" onClick={handleUpdateProduct}>Update Product</button>
                ) : (
                    <button className="neom-button primary" onClick={handleAddProduct}>Add Product</button>
                )}
                {editingProduct && (
                    <button className="neom-button secondary ml-2" onClick={() => { setEditingProduct(null); setForm({ id: '', name: '', category: '', price: '', image: '' }); }}>Cancel Edit</button>
                )}
            </div>

            {/* Product List */}
            <div className="admin-product-list neom-card mt-4">
                <h3>Current Products ({adminProducts.length})</h3>
                {adminProducts.length === 0 ? (
                    <p>No products to display in the admin panel.</p>
                ) : (
                    <table className="admin-product-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminProducts.map(product => (
                                <tr key={product.id}>
                                    <td><img src={product.image} alt={product.name} className="admin-product-thumb" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/50x50/3a3a3a/e0e0e0?text=Img"; }} /></td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>
                                        <button className="neom-button small" onClick={() => handleEditClick(product)}>Edit</button>
                                        <button className="neom-button small danger ml-2" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

// === Main App Component ===
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null); // 'customer' or 'admin'
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'auth', 'dashboard', 'wishlist', 'checkout', 'payment', 'admin'
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const allProducts = MOCK_ALL_PRODUCTS; // All available products

    // Effect to update cart count in local storage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Effect to update wishlist in local storage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Load cart and wishlist from local storage on initial render
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(storedWishlist);
    }, []);

    const handleLoginSuccess = (type) => {
        setIsLoggedIn(true);
        setUserType(type);
        setCurrentPage(type === 'admin' ? 'admin' : 'dashboard');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserType(null);
        setCurrentPage('home');
        setCart([]); // Clear cart on logout
        setWishlist([]); // Clear wishlist on logout
        localStorage.removeItem('cart');
        localStorage.removeItem('wishlist');
    };

    const handleAddToCart = (productToAdd) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...productToAdd, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const handleUpdateCartItemQuantity = (productId, newQuantity) => {
        setCart(prevCart => {
            if (newQuantity <= 0) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    const handleAddToWishlist = (productToAdd) => {
        setWishlist(prevWishlist => {
            const exists = prevWishlist.some(item => item.id === productToAdd.id);
            if (!exists) {
                return [...prevWishlist, productToAdd];
            }
            return prevWishlist; // Already in wishlist
        });
    };

    const handleRemoveFromWishlist = (productId) => {
        setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
    };

    const handleProceedToPayment = () => {
        setCurrentPage('payment');
    };

    const handlePaymentResult = (isSuccess) => {
        if (isSuccess) {
            setCart([]); // Clear cart on successful payment
            localStorage.removeItem('cart');
        }
        // Optionally navigate away after a brief delay, or show a persistent message
        setTimeout(() => {
            setCurrentPage('dashboard'); // Go back to shop after payment animation
        }, 3000); // Wait for animation to finish
    };


    const renderPage = () => {
        switch (currentPage) {
            case 'auth':
                return <AuthPage onLoginSuccess={handleLoginSuccess} />;
            case 'dashboard':
                return isLoggedIn ? (
                    <HomePage
                        products={allProducts}
                        onAddToCart={handleAddToCart}
                        onAddToWishlist={handleAddToWishlist}
                        onNavigate={setCurrentPage}
                    />
                ) : (
                    <AuthPage onLoginSuccess={handleLoginSuccess} />
                );
            case 'wishlist':
                return isLoggedIn ? (
                    <WishlistPage
                        wishlist={wishlist}
                        onAddToCart={handleAddToCart}
                        onRemoveFromWishlist={handleRemoveFromWishlist}
                    />
                ) : (
                    <AuthPage onLoginSuccess={handleLoginSuccess} />
                );
            case 'checkout':
                return isLoggedIn ? (
                    <CheckoutPage
                        cart={cart}
                        onRemoveFromCart={handleRemoveFromCart}
                        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
                        onProceedToPayment={handleProceedToPayment}
                    />
                ) : (
                    <AuthPage onLoginSuccess={handleLoginSuccess} />
                );
            case 'payment':
                return isLoggedIn ? (
                    <PaymentPage
                        onPaymentResult={handlePaymentResult}
                    />
                ) : (
                    <AuthPage onLoginSuccess={handleLoginSuccess} />
                );
            case 'admin':
                return isLoggedIn && userType === 'admin' ? (
                    <AdminDashboard products={allProducts} />
                ) : (
                    <AuthPage onLoginSuccess={handleLoginSuccess} />
                );
            case 'home':
            default:
                return (
                    <HomePage
                        products={allProducts}
                        onAddToCart={handleAddToCart}
                        onAddToWishlist={handleAddToWishlist}
                        onNavigate={setCurrentPage}
                    />
                );
        }
    };

    return (
        <div className="app">
            <Navbar
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                cartItemCount={cart.reduce((count, item) => count + item.quantity, 0)}
                onNavLinkClick={setCurrentPage}
            />
            <main className="app-main-content">
                {renderPage()}
            </main>
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2025 Fit-Finder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;