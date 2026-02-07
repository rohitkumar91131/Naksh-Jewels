const validate = (req, res, next) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ error: "Valid Product ID and Quantity are required" });
    }
    next();
};

module.exports = validate;