const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");

module.exports = (app) => {
  // Trang chủ
  app.use("/", homeRoutes);

  // Trang sản phẩm
  app.use("/products", productRoutes);
};