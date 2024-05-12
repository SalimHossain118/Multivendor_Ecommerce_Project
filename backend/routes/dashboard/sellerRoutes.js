/** @format */

const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware.js");
const sellerController = require("../../controllers/dashboard/sellerController.js");

router.get(
  "/get-seller-request",
  authMiddleware,
  sellerController.get_seller_request_controller
);
router.get(
  "/get-seller/:sellerId",
  authMiddleware,
  sellerController.get_seller_info_controller
);

router.post(
  "/seller-status-update",
  authMiddleware,
  sellerController.seller_status_update_controller
);

router.get(
  "/get-sellers",
  authMiddleware,
  sellerController.get_active_sellers_controller
);

router.get(
  "/get-deactive-sellers",
  authMiddleware,
  sellerController.get_deActive_sellers_controller
);

module.exports = router;
