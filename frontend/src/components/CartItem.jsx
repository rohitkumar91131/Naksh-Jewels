import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';

const CartItem = ({ item }) => {
    const { updateQuantity } = useContext(CartContext);

    return (
        <div className="cart-item-card">
            <div className="cart-item-image">
                <img 
                    src={item.profileImage || "https://placehold.co/100"} 
                    alt={item.title} 
                />
            </div>

            <div className="cart-item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-category">{item.category?.name || 'Jewellery'}</p>
                <p className="item-price">₹{item.price.toLocaleString()}</p>
            </div>

            <div className="cart-item-actions">
                <div className="qty-selector">
                    <button onClick={() => updateQuantity(item._id, 'dec')}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 'inc')}>+</button>
                </div>
            </div>
            
            <div className="item-subtotal">
                ₹{(item.price * item.quantity).toLocaleString()}
            </div>
        </div>
    );
};

export default CartItem;