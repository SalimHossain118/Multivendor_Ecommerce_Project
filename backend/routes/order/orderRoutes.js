/** @format */

const router = require("express").Router();
const orderController = require("../../controllers/order/orderController.js");

router.post("/home/order/palce-order", orderController.place_order);
router.get(
  "/home/customer/gat-dashboard-data/:userId",
  orderController.get_customer_databorad_data
);
router.get(
  "/home/customer/gat-orders/:customerId/:status",
  orderController.get_orders
);

router.get(
  "/home/customer/get-order-details/:orderId",
  orderController.get_order_details
);

// --- admin
router.get("/admin/orders", orderController.get_admin_orders);

module.exports = router;
