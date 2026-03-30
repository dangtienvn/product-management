const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

// Trang sản phẩm
router.get("/", controller.index);

module.exports = router;