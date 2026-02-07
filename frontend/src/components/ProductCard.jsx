import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart, removeFromCart, updateQuantity, cartItems } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const cartItem = cartItems.find(item => item._id === product._id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = async () => {
        if (!user) {
            showToast("Please login to add items to cart", "error");
            navigate('/auth/login');
            return;
        }

        setIsAdding(true); 
        await addToCart(product); 
        showToast("Item added to cart", "success");
        setIsAdding(false); 
    };

    const handleIncrease = () => {
        updateQuantity(product._id, 'inc');
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            updateQuantity(product._id, 'dec');
        } else {
            removeFromCart(product._id);
            showToast("Item removed from cart", "info");
        }
    };

    return (
        <div className="product-card">
            <div className="image-container">
                <img 
                    src={product.profileDataUrl || "https://placehold.co/600x400"} 
                    alt="" 
                    className="product-image placeholder" 
                />
                <img 
                    src={product.profileImage} 
                    alt={product.title} 
                    className={`product-image main ${isLoaded ? 'loaded' : ''}`}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                />
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.title}</h3>
                <p className="product-price">₹{product.price.toLocaleString()}</p>
                
                {quantity > 0 ? (
                    <div className="quantity-controls-card">
                        <button onClick={handleDecrease} className="qty-btn minus">-</button>
                        <span className="qty-value">{quantity}</span>
                        <button onClick={handleIncrease} className="qty-btn plus">+</button>
                    </div>
                ) : (
                    <button 
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                        disabled={isAdding} 
                    >
                        {isAdding ? "Adding..." : "Add to Cart"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;