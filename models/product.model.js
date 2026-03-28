const mongoose = require("mongoose");

// Tao moi bo khung
const productSchema  = new mongoose.Schema({
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    stock: 94,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    status: "active",
    position: 1,
    deleted: Boolean
});

const Product  = mongoose.model('Product', productSchema, "products");
model.exports = Product;