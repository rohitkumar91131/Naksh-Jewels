import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext'; // 1. Import Toast
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { searchQuery, setSearchQuery } = useContext(ProductContext);
    const { cartCount } = useContext(CartContext);
    const { showToast } = useContext(ToastContext); // 2. Get Toast function
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        showToast("Logged out successfully", "success"); // 3. Show Success Message
        navigate('/auth/login');
        setIsMenuOpen(false); 
    };

    return (
        <nav className="navbar">
            <Link to="/" className="brand-link">
                <img src="/logo.png" alt="Naksh Jewels" className="nav-logo" /> 
                <span className="brand-name">Naksh Jewels</span>
            </Link>

            <div className="navbar-search">
                <input 
                    type="text" 
                    placeholder="Search jewellery..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            <button 
                className="menu-toggle" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? "✖" : "☰"} {/* 4. Dynamic Icon */}
            </button>

            <div className={`navbar-actions ${isMenuOpen ? 'active' : ''}`}>
                <Link 
                    to="/cart" 
                    className="nav-link cart-link"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Cart 🛒
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
                
                {user ? (
                    <button onClick={handleLogout} className="nav-btn logout-btn">
                        Logout
                    </button>
                ) : (
                    <Link 
                        to="/auth/login" 
                        className="nav-btn login-btn"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;