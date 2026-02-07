import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext'; 
import '../styles/Cart.css';

const CartSummary = () => {
    const { cartTotal, cartCount } = useContext(CartContext);
    const { showToast } = useContext(ToastContext)
    const shipping = cartTotal > 5000 ? 0 : 500; 
    const finalTotal = cartTotal + shipping;

    const handleCheckoutClick = () => {
        showToast("This feature is coming soon!", "info");
    };

    return (
        <div className="cart-summary-card">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
                <span>Subtotal ({cartCount} items)</span>
                <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            
            <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="free">FREE</span> : `₹${shipping}`}</span>
            </div>

            <hr className="divider" />

            <div className="summary-row total">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
            </div>

            <button className="checkout-btn-full" onClick={handleCheckoutClick}>
                Proceed to Checkout
            </button>
            
            <div className="secure-badge">
                🔒 Secure Checkout
            </div>
        </div>
    );
};

export default CartSummary;