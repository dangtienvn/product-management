const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

// Trang sản phẩm
router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);
// fallback POST handlers (forms may submit POST + _method)
router.post("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);
router.post("/change-multi", controller.changeMulti);

module.exports = router;