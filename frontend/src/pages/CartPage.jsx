import { useContext } from 'react';

import { Link } from 'react-router-dom';
import '../styles/Cart.css';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import CartNavbar from '../components/CartNavbar';

const CartPage = () => {
    const { cartItems, loading } = useContext(CartContext);
    if (loading) return <div className="cart-loader">Loading your bag...</div>;

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-container">
                <div className="empty-icon">🛍️</div>
                <h2>Your bag is empty</h2>
                <p>Looks like you haven't added any pieces yet.</p>
                <Link to="/" className="continue-shopping-btn">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page-wrapper">
            <CartNavbar />
            <h1 className="cart-header">Your Shopping Bag</h1>
            
            <div className="cart-layout">
                {/* Left Column: Items List */}
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                </div>

                {/* Right Column: Summary */}
                <div className="cart-summary-section">
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default CartPage;