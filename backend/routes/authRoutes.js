/** @format */

const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const authControllers = require("../controllers/authControllers.js");

router.post("/admin-login", authControllers.admin_login);

router.get("/get-user", authMiddleware, authControllers.getUser);

router.post(
  "/seller-registration",
  authControllers.seller_REgistration_controller
);

router.post("/seller-login", authControllers.seller_login);

router.post(
  "/profile-image-upload",
  authMiddleware,
  authControllers.seller_Profile_image_upload_controller
);

router.post(
  "/seller-shopInf-add",
  authMiddleware,
  authControllers.seller_shop_infAdd_controller
);
// ==>

router.get("/logout", authMiddleware, authControllers.logout);

module.exports = router;
