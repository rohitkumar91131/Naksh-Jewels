const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// 1. Get Cart (User is identified by Token)
exports.getCart = async (req, res) => {
    try {
        // 👇 Get ID from the logged-in user (Middleware)
        const userId = req.user.id; 

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Add to Cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // 👇 From Token
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Cart exists -> Check if product is already in it
            const itemIndex = cart.items.findIndex(p => p.productId == productId);

            if (itemIndex > -1) {
                // Product exists -> Increase Quantity
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                // Product new -> Push to array
                cart.items.push({ productId, quantity: quantity || 1 });
            }
            cart = await cart.save();
        } else {
            // No Cart -> Create New
            cart = await Cart.create({
                userId,
                items: [{ productId, quantity: quantity || 1 }]
            });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// 3. Remove Item
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id; // 👇 From Token
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // Filter out the item
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};