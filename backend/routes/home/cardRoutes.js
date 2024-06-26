/** @format */

const router = require("express").Router();
const cardController = require("../../controllers/home/cardController.js");
router.post("/home/product/add-to-card", cardController.add_to_card);
router.get(
  "/home/product/get-card-products/:userId",
  cardController.get_card_products
);
router.delete(
  "/home/product/delete-card-product/:card_id",
  cardController.delete_card_product
);
router.put("/home/product/quantity-inc/:card_id", cardController.quantity_inc);
router.put("/home/product/quantity-dec/:card_id", cardController.quantity_dec);

//-->
router.post("/home/product/add-to-wishlist", cardController.add_to_wishList);
router.get(
  "/home/product/get_wishlist_products/:userId",
  cardController.get_wishList_products
);

router.delete(
  "/home/product/remove-wishlist/:wishlist_id",
  cardController.delete_wishlist_product
);

module.exports = router;
