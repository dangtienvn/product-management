const mongoose = require("mongoose");

// Tao moi bo khung
const productSchema  = new mongoose.Schema({
    title: String,
    description: String,
    price: { type: Number },
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean
});

const Product  = mongoose.model('Product', productSchema, "products");

module.exports = Product;