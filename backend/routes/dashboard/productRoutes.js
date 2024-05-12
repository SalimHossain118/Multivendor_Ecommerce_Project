/** @format */

const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware.js");
const productsController = require("../../controllers/dashboard/productController.js");

router.post("/add-products", authMiddleware, productsController.add_products);
router.get("/get-products", authMiddleware, productsController.get_products);
router.get(
  "/get-a-product/:productId",
  authMiddleware,
  productsController.getA_productsContro
);
router.post(
  "/update-product",
  authMiddleware,
  productsController.update_product
);
router.post(
  "/product-image-update",
  authMiddleware,
  productsController.product_image_update
);

module.exports = router;
