const Product = require("../../models/product.model");
const mongoose = require("mongoose");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);

    // Query object 
    let find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status;
    }
    // End of filter status

    // Search object 
    const objSearch = searchHelper(req.query);
    if (objSearch.keyword) {
        find.title = objSearch.regex;
    }
    // End of search

    // Count and build pagination using helper
    const countProducts = await Product.countDocuments(find);
    const objectPagination = paginationHelper(req.query, countProducts, { limitDefault: 4, windowSize: 5 });

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objectPagination,
        baseQuery: objectPagination.baseQuery
    });
}

// [PATCH] /admin/products/change-status/inactive/:status/id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    if (!id) {
        console.error("changeStatus: missing id param");
        return res.redirect(req.baseUrl || "/admin/products");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("changeStatus: invalid ObjectId", id);
        return res.redirect("back");
    }

    if (!status || (status !== "active" && status !== "inactive")) {
        console.error("changeStatus: invalid status param", status);
        return res.redirect(req.baseUrl || "/admin/products");
    }

    try {
        await Product.updateOne({ _id: id }, { status: status });
    } catch (err) {
        console.error("changeStatus error:", err);
    }

    return res.redirect(req.baseUrl || "/admin/products");
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const idsRaw = req.body.ids || "";
    const type = req.body.type;

    // parse ids (comma-separated) into array of valid ObjectIds
    const idsArr = idsRaw
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0 && mongoose.Types.ObjectId.isValid(s));

    if (idsArr.length === 0) {
        console.error("changeMulti: no valid ids provided", idsRaw);
        return res.redirect(req.baseUrl || "/admin/products");
    }

    try {
        if (type === "active") {
            await Product.updateMany({ _id: { $in: idsArr } }, { status: "active" });
        } else if (type === "inactive") {
            await Product.updateMany({ _id: { $in: idsArr } }, { status: "inactive" });
        }
    } catch (err) {
        console.error("changeMulti error:", err);
    }

    return res.redirect(req.baseUrl || "/admin/products");
};