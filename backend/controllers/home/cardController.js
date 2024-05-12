/** @format */

const cardModel = require("../../models/cardModel.js");
const wishlistModel = require("../../models/wishlistModel.js");

const { responseReturn } = require("../../utiles/response.js");
const mongoose = require("mongoose");
const {
  mongo: { ObjectId },
} = require("mongoose");
class CardController {
  //
  //
  // add_to_card = async (req, res) => {
  //   const { userId, productId, quantity } = req.body;
  //   const c_product = await cardModel.findOne({
  //     $and: [
  //       {
  //         productId: {
  //           $eq: productId,
  //         },
  //       },

  //       {
  //         userId: {
  //           $eq: userId,
  //         },
  //       },
  //     ],
  //   });
  //   if (c_product) {
  //     responseReturn(res, 400, { error: "Product Already Exists" });
  //   } else {
  //     const newCardProduct = await cardModel.create({
  //       userId,
  //       productId,
  //       quantity,
  //     });
  //     responseReturn(res, 200, {
  //       message: "Product Added To Card",
  //       newCardProduct,
  //     });
  //   }
  // };

  add_to_card = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const product = await cardModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });
      if (product) {
        responseReturn(res, 404, {
          error: "Product already added to card",
        });
      } else {
        const product = await cardModel.create({
          userId,
          productId,
          quantity,
        });
        responseReturn(res, 201, {
          message: "Add to card success",
          product,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // --->

  get_card_products = async (req, res) => {
    const co = 5;
    const { userId } = req.params;
    try {
      const card_products = await cardModel.aggregate([
        {
          $match: {
            userId: {
              $eq: new ObjectId(userId),
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);
      let buy_product_item = 0;
      let calculatePrice = 0;
      let card_product_count = 0;
      const outOfStockProduct = card_products.filter(
        (p) => p.products[0].stock < p.quantity
      );
      for (let i = 0; i < outOfStockProduct.length; i++) {
        card_product_count = card_product_count + outOfStockProduct[i].quantity;
      }
      const stockProduct = card_products.filter(
        (p) => p.products[0].stock >= p.quantity
      );
      for (let i = 0; i < stockProduct.length; i++) {
        const { quantity } = stockProduct[i];
        card_product_count = card_product_count + quantity;
        buy_product_item = buy_product_item + quantity;
        const { price, discount } = stockProduct[i].products[0];
        if (discount !== 0) {
          calculatePrice =
            calculatePrice +
            quantity * (price - Math.floor((price * discount) / 100));
        } else {
          calculatePrice = calculatePrice + quantity * price;
        }
      }
      let p = [];
      let unique = [
        ...new Set(stockProduct.map((p) => p.products[0].sellerId.toString())),
      ];
      for (let i = 0; i < unique.length; i++) {
        let price = 0;
        for (let j = 0; j < stockProduct.length; j++) {
          const tempProduct = stockProduct[j].products[0];
          if (unique[i] === tempProduct.sellerId.toString()) {
            let pri = 0;
            if (tempProduct.discount !== 0) {
              pri =
                tempProduct.price -
                Math.floor((tempProduct.price * tempProduct.discount) / 100);
            } else {
              pri = tempProduct.price;
            }
            pri = pri - Math.floor((pri * co) / 100);
            price = price + pri * stockProduct[j].quantity;
            p[i] = {
              sellerId: unique[i],
              shopName: tempProduct.shopName,
              price,
              products: p[i]
                ? [
                    ...p[i].products,
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ]
                : [
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ],
            };
          }
        }
      }
      responseReturn(res, 200, {
        card_products: p,
        price: calculatePrice,
        card_product_count,
        shipping_fee: 85 * p.length,
        outOfStockProduct,
        buy_product_item,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  delete_card_product = async (req, res) => {
    const { card_id } = req.params;

    try {
      await cardModel.findByIdAndDelete(card_id);
      responseReturn(res, 200, { message: "Card deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  //

  quantity_inc = async (req, res) => {
    const { card_id } = req.params;

    try {
      const product_toUpdate = await cardModel.findById(card_id);
      const { quantity } = product_toUpdate;
      await cardModel.findByIdAndUpdate(card_id, {
        quantity: quantity + 1,
      });
      responseReturn(res, 200, {
        message: "Product add success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //==>

  quantity_dec = async (req, res) => {
    const { card_id } = req.params;
    try {
      const product = await cardModel.findById(card_id);
      const { quantity } = product;

      await cardModel.findByIdAndUpdate(card_id, {
        quantity: quantity - 1,
      });
      responseReturn(res, 200, {
        message: "success",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // -->

  add_to_wishList = async (req, res) => {
    const { slug } = req.body;

    try {
      const product = await wishlistModel.findOne({
        slug,
      });
      if (product) {
        responseReturn(res, 409, {
          error: "Product already added to wishlist",
        });
      } else {
        await wishlistModel.create(req.body);
        responseReturn(res, 201, {
          message: "Product added to wishlist successfully",
        });
      }
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, {
        error: "Internal Server Error",
      });
    }
  };

  get_wishList_products = async (req, res) => {
    const { userId } = req.params;
    try {
      const wishlists = await wishlistModel.find();
      responseReturn(res, 200, { wishlistCount: wishlists.length, wishlists });
    } catch (error) {
      console.log(error.message);
    }
  };

  // -->

  delete_wishlist_product = async (req, res) => {
    const { wishlist_id } = req.params;

    try {
      await wishlistModel.findByIdAndDelete(wishlist_id);
      responseReturn(res, 200, {
        message: "Card deleted successfully",
        wishlist_id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new CardController();