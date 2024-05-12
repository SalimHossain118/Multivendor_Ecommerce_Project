/** @format */

const { request } = require("express");
const categoryModel = require("../../models/categoryModel");
const productsModel = require("../../models/productModel.js");
const reviewModel = require("../../models/reviewModel.js");
const queryProducts = require("../../utiles/queryProducts.js");
const { responseReturn } = require("../../utiles/response.js");
const moment = require("moment");
const productModel = require("../../models/productModel.js");
const {
  mongo: { ObjectId },
} = require("mongoose");
//
//
class homeControllers {
  productFormat = (proDucts) => {
    const productArray = [];
    let i = 0;
    while (i < proDucts.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (proDucts[j]) {
          temp.push(proDucts[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };

  get_home_categories = async (req, res) => {
    try {
      const categorys = await categoryModel.find();
      responseReturn(res, 200, { categorys });
    } catch (error) {
      console.error("Error fetching home categories:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  get_home_products = async (req, res) => {
    try {
      const products = await productsModel
        .find({})
        .limit(16)
        .sort({ createdAt: -1 });

      const subLatestProducts = await productsModel
        .find({})
        .limit(9)
        .sort({ createdAt: -1 });

      const latestProducts = this.productFormat(subLatestProducts);
      const subTopRatedProducts = await productsModel
        .find({})
        .limit(9)
        .sort({ rating: -1 });
      const topRatedProducts = this.productFormat(subTopRatedProducts);

      const subDisountProducts = await productsModel
        .find({})
        .limit(9)
        .sort({ rating: -1 });
      const discountProducts = this.productFormat(subDisountProducts);

      responseReturn(res, 200, {
        products,
        latestProducts,
        topRatedProducts,
        discountProducts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  get_product = async (req, res) => {
    const { slug } = req.params;

    try {
      const product = await productsModel.findOne({ slug: slug });
      const relatedProducts = await productsModel
        .find({
          $and: [
            {
              _id: {
                $ne: product.id,
              },
            },
            {
              category: {
                $eq: product.category,
              },
            },
          ],
        })
        .limit(20);
      const moreProducts = await productsModel.find({
        $and: [
          {
            _id: {
              $ne: product.id,
            },
          },
          {
            sellerId: {
              $eq: product.sellerId,
            },
          },
        ],
      });
      responseReturn(res, 200, {
        product,
        relatedProducts,
        moreProducts,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  price_range_products = async (req, res) => {
    try {
      const { lowPrice, highPrice } = req.body;

      const priceRange = {
        low: 0,
        high: 0,
      };

      const subLatestProducts = await productsModel
        .find({})
        .limit(9)
        .sort({ createdAt: -1 });

      const latestProducts = this.productFormat(subLatestProducts);

      const productsPrices = await productsModel.find({}).sort({ price: 1 });

      if (productsPrices.length > 0) {
        priceRange.high = productsPrices[productsPrices.length - 1].price;
        priceRange.low = productsPrices[0].price;
      }

      responseReturn(res, 200, { latestProducts, priceRange });
    } catch (error) {
      console.log(error);
    }
  };

  // shop_page_query_products = async (req, res) => {
  //   const parPage = 12;
  //   req.query.parPage = parPage;
  //   try {
  //     const products = await productsModel.find({}).sort({
  //       createdAt: -1,
  //     });

  //     console.log("Initial products", products);
  //     console.log("Query parameters", req.query);

  //     const queryHandler = new queryProducts(products, req.query);

  //     queryHandler.categoryQuery();
  //     console.log("After category query", queryHandler.getProducts());

  //     queryHandler.ratingQuery();
  //     console.log("After rating query", queryHandler.getProducts());

  //     queryHandler.priceQuery();
  //     console.log("After price query", queryHandler.getProducts());

  //     queryHandler.sortByPrice();
  //     console.log("After sort by price", queryHandler.getProducts());

  //     queryHandler.skip();
  //     console.log("After skip", queryHandler.getProducts());

  //     queryHandler.limit();
  //     console.log("After limit", queryHandler.getProducts());

  //     const totalProduct = queryHandler.countProducts();
  //     const result = queryHandler.getProducts();

  //     console.log("Filtered products:", result);

  //     responseReturn(res, 200, {
  //       products: result,
  //       totalProduct,
  //       parPage,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     responseReturn(res, 500, { message: "Internal Server Error" });
  //   }
  // };

  shop_page_query_products = async (req, res) => {
    const parPage = 12;
    console.log(req.query);
    const minValue = 300; // Assuming the minimum allowed value is 300
    const maxValue = 30000; // Assuming the maximum allowed value is 30000

    // Ensure the values are within the allowed range
    const lowPrice = Math.max(req.query.lowPrice, minValue);
    const highPrice = Math.min(req.query.highPrice, maxValue);

    req.query.lowPrice = lowPrice;
    req.query.highPrice = highPrice;
    req.query.parPage = parPage;

    try {
      const products = await productsModel.find({}).sort({
        createdAt: -1,
      });

      const queryHandler = new queryProducts(products, req.query);

      queryHandler.categoryQuery();
      queryHandler.searchQuery();
      queryHandler.ratingQuery();
      queryHandler.priceQuery();
      queryHandler.sortByPrice();
      queryHandler.skip();
      queryHandler.limit();

      const totalProducts = queryHandler.countProducts();
      const result = queryHandler.getProducts();

      responseReturn(res, 200, {
        products: result,
        totalProducts,
        parPage,
      });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };

  customer_review = async (req, res) => {
    const { name, review, rating, productId } = req.body;

    try {
      await reviewModel.create({
        name,
        review,
        rating,
        productId,
        date: moment(Date.now()).format("LL"),
      });

      let preCalculateRating = 0;
      const allReviews = await reviewModel.find({ productId });

      for (let i = 0; i < allReviews.length; i++) {
        preCalculateRating = preCalculateRating + allReviews[i].rating;
      }

      let ratingToUpdate = 0;
      if (allReviews.length !== 0) {
        ratingToUpdate = (preCalculateRating / allReviews.length).toFixed();
      }
      await productModel.findByIdAndUpdate(productId, {
        rating: ratingToUpdate,
      });
      responseReturn(res, 200, { message: "Thank You for valiable Review" });
    } catch (error) {
      console.log(error);
    }
  };

  // end --->

  get_reviews = async (req, res) => {
    const { productId } = req.params;
    let { pageNumber } = req.query;

    pageNumber = parseInt(pageNumber);
    const limit = 5;
    const skipPage = limit * (pageNumber - 1);

    try {
      let getRating = await reviewModel.aggregate([
        {
          $match: {
            productId: {
              $eq: new ObjectId(productId),
            },
            rating: {
              $not: {
                $size: 0,
              },
            },
          },
        },
        {
          $unwind: "$rating",
        },
        {
          $group: {
            _id: "$rating",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let rating_review = [
        {
          rating: 5,
          sum: 0,
        },
        {
          rating: 4,
          sum: 0,
        },
        {
          rating: 3,
          sum: 0,
        },
        {
          rating: 2,
          sum: 0,
        },
        {
          rating: 1,
          sum: 0,
        },
      ];

      for (let i = 0; i < rating_review.length; i++) {
        for (let j = 0; j < getRating.length; j++) {
          if (rating_review[i].rating === getRating[j]._id) {
            rating_review[i].sum = getRating[j].count;
            break;
          }
        }
      }

      const getAll = await reviewModel.find({
        productId,
      });
      const reviews = await reviewModel
        .find({
          productId,
        })
        .skip(skipPage)
        .limit(limit)
        .sort({
          createdAt: -1,
        });
      console.log(getRating);
      responseReturn(res, 200, {
        reviews,
        totalReview: getAll.length,
        rating_review,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new homeControllers();
