const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments();

        const products = await Product.find({})
            .select('title price profileImage profileDataUrl category')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;
        const query = req.query.q || "";

        const searchFilter = {
            title: { $regex: query, $options: "i" }
        };

        const totalProducts = await Product.countDocuments(searchFilter);

        const products = await Product.find(searchFilter)
            .select('title price profileImage profileDataUrl category')
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};