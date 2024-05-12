/** @format */

const router = require("express").Router();
const customerAuthController = require("../../controllers/home/customerAuthController");

router.post("/customer-register", customerAuthController.customer_register);
router.post("/customer-login", customerAuthController.customer_login);
module.exports = router;
