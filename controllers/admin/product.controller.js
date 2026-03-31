const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    /* console.log(req.query.status); */ 

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
        products: products
    });
}