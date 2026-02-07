import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchCart = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendUrl}/cart`, {
                withCredentials: true
            });
            
            const formattedItems = res.data.items ? res.data.items.map(item => ({
                ...item.productId,
                quantity: item.quantity,
                _id: item.productId._id
            })) : [];
            
            setCartItems(formattedItems);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev.map(item => 
                    item._id === product._id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        try {
            await axios.post(`${backendUrl}/cart/add`, {
                productId: product._id,
                quantity: 1
            }, { withCredentials: true });
            
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const removeFromCart = async (productId) => {
        setCartItems(prev => prev.filter(item => item._id !== productId));

        try {
            await axios.post(`${backendUrl}/cart/remove`, {
                productId
            }, { withCredentials: true });
        } catch (err) {
            console.error(err);
        }
    };

    const updateQuantity = async (productId, type) => {
        const currentItem = cartItems.find(item => item._id === productId);
        
        if (type === 'dec' && currentItem && currentItem.quantity === 1) {
            await removeFromCart(productId);
            return;
        }

        setCartItems(prev => prev.map(item => {
            if (item._id === productId) {
                const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: newQty };
            }
            return item;
        }));

        try {
            const qtyToSend = type === 'inc' ? 1 : -1;

            await axios.post(`${backendUrl}/cart/add`, {
                productId: productId,
                quantity: qtyToSend
            }, { withCredentials: true });

        } catch (err) {
            console.error(err);
            fetchCart();
        }
    };

    const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 0)), 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity,
            cartCount, 
            cartTotal,
            loading
        }}>
            {children}
        </CartContext.Provider>
    );
};