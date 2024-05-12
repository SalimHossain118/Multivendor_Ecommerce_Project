/** @format */

const router = require("express").Router();
const homeControllers = require("../../controllers/home/homeControllers.js");

router.get("/get-categorys", homeControllers.get_home_categories);
router.get("/get-products", homeControllers.get_home_products);
router.get(
  "/price-range-latest-products",
  homeControllers.price_range_products
);
router.get(
  "/shop-page-query-products",
  homeControllers.shop_page_query_products
);

router.get("/home/get-product/:slug", homeControllers.get_product);

router.post("/home/customer/submit-review", homeControllers.customer_review);
router.get(
  "/home/customer/get-reviews/:productId",
  homeControllers.get_reviews
);

module.exports = router;
