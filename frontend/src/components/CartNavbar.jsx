import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import '../styles/CartNavbar.css'; 

const CartNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
        setIsMenuOpen(false);
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="cart-navbar">
            <div className="navbar-container">
                
                <Link to="/" className="brand-link" onClick={closeMenu}>
                    <span className="brand-name">Naksh Jewels</span>
                </Link>

                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? "✖" : "☰"}
                </button>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    
                    <Link to="/" className="nav-item" onClick={closeMenu}>Home</Link>
                    
                    <Link to="/cart" className="nav-item cart-link-active" onClick={closeMenu}>
                        Cart
                        <div className="cart-icon-wrapper">
                            🛒
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </div>
                    </Link>

                    {user ? (
                        <div className="user-controls">
                            <span className="user-greeting">Hi, {user.email?.split('@')[0]}</span>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </div>
                    ) : (
                        <Link to="/auth/login" className="login-btn" onClick={closeMenu}>Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default CartNavbar;