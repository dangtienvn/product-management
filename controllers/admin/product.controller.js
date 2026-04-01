const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let filterStatus = [
        // index = 0: all, index = 1: active, index = 2: inactive
        {
            name: "Tất cả",
            status: "",
            class: "active"
        },
        {
            name: "Còn hàng",
            status: "active",
            class: ""
        },
        {
            name: "Dừng kinh doanh",
            status: "inactive",
            class: ""
        }
    ]; 

    if (req.query.status) {
        // If a status filter is applied, set the corresponding item as active
        const index = filterStatus.findIndex(item => item.status === req.query.status);
        filterStatus[index].class = "active";
    } else {
        // If no status filter is applied, set "Tất cả" as active
        const index = filterStatus.findIndex(item => item.status === "");
        filterStatus[index].class = "active";
    }

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