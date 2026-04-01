const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require("../../helpers/search");

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
    // End of filter status

    // Build the search object based on the query parameters
    const objSearch = searchHelper(req.query);

    if (objSearch.keyword) {
        find.title = objSearch.regex;
    }
    // End of search

    // Pagination
    let objectPagination = {
        currentPage: 1,
        limitItem: 4
    };

    if (req.query.page) {
        const p = parseInt(req.query.page);
        if (!isNaN(p) && p > 0) objectPagination.currentPage = p;
    }

    if (req.query.limit) {
        const l = parseInt(req.query.limit);
        if (!isNaN(l) && l > 0) objectPagination.limitItem = l;
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;

    const countProducts = await Product.countDocuments(find);
    objectPagination.totalPage = Math.max(1, Math.ceil(countProducts / objectPagination.limitItem));

    // Clamp currentPage
    if (objectPagination.currentPage > objectPagination.totalPage) {
        objectPagination.currentPage = objectPagination.totalPage;
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    }

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

    // Build pagination pages window (max 5 pages visible)
    const windowSize = 5;
    let start = Math.max(1, objectPagination.currentPage - Math.floor(windowSize / 2));
    let end = Math.min(objectPagination.totalPage, start + windowSize - 1);
    if (end - start + 1 < windowSize) {
        start = Math.max(1, end - windowSize + 1);
    }
    objectPagination.pages = [];
    for (let i = start; i <= end; i++) objectPagination.pages.push(i);

    objectPagination.hasPrev = objectPagination.currentPage > 1;
    objectPagination.hasNext = objectPagination.currentPage < objectPagination.totalPage;
    objectPagination.prevPage = objectPagination.hasPrev ? objectPagination.currentPage - 1 : null;
    objectPagination.nextPage = objectPagination.hasNext ? objectPagination.currentPage + 1 : null;
    objectPagination.firstPage = 1;
    objectPagination.lastPage = objectPagination.totalPage;

    // Build base query string excluding page param so view can append `page=` easily
    const queryObj = { ...req.query };
    delete queryObj.page;
    const baseQuery = new URLSearchParams(queryObj).toString();
    
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objectPagination,
        baseQuery: baseQuery
    });
}