const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/home.controller");

// Trang chủ
router.get("/", controller.index);

module.exports = router;