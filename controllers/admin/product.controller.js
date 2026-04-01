const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
  
    // Build the query object for fetching products based on the filters
    let find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    // Search by name/title
    if (req.query.q) {
        find.title = { $regex: req.query.q, $options: "i" };
    }

    const products = await Product.find(find);

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus
    });
}