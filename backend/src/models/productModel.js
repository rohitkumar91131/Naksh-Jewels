const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }], 
    category: {
        id: Number,
        name: String,
        image: String
    },
    profileImage: { type: String }, 
    profileDataUrl: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);