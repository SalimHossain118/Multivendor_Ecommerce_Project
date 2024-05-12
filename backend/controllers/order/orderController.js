/** @format */
const authOrderModel = require("../../models/authOrder.js");
const customerOrderModel = require("../../models/customerOrder.js");
const cardModel = require("../../models/cardModel.js");

const {
  mongo: { ObjectId },
} = require("mongoose");
const { responseReturn } = require("../../utiles/response");
const moment = require("moment");

class orderController {
  paymentCheck = async (id) => {
    try {
      const order = await customerOrderModel.findById(id);
      if (order.payment_status === "unpaid") {
        await customerOrderModel.findByIdAndUpdate(id, {
          delivery_status: "cancelled",
        });
        await authOrderModel.updateMany(
          {
            orderId: id,
          },
          {
            delivery_status: "cancelled",
          }
        );
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  // ==>
  place_order = async (req, res) => {
    const { price, products, shipping_fee, shippingInfo, userId } = req.body;
    // console.log("Products==>", products);
    let authorOrderData = [];
    let cardId = [];
    const tempDate = moment(Date.now()).format("LLL");

    let customerOrderProducts = [];

    // all data formating to send customer
    for (let i = 0; i < products.length; i++) {
      const formetedProduct = products[i].products;
      for (let j = 0; j < formetedProduct.length; j++) {
        let tempCustomerProduct = formetedProduct[j].productInfo;
        customerOrderProducts.push(tempCustomerProduct);
        if (formetedProduct[j]._id) {
          cardId.push(formetedProduct[j]._id);
        }
      }
    }

    try {
      const customerOrder = await customerOrderModel.create({
        customerId: userId,
        shippingInfo,
        products: customerOrderProducts,
        price: price + shipping_fee,
        delivery_status: "pending",
        payment_status: "unpaid",
        date: tempDate,
      });
      // data formating to send Shop owners(seller)

      for (let i = 0; i < products.length; i++) {
        const pro = products[i].products;
        const pri = products[i].price;
        const sellerId = products[i].sellerId;
        let storePro = [];
        for (let j = 0; j < pro.length; j++) {
          let tempPro = pro[j].productInfo;
          tempPro.quantity = pro[j].quantity;
          storePro.push(tempPro);
        }
        authorOrderData.push({
          orderId: customerOrder.id,
          sellerId,
          products: storePro,
          price: pri,
          delivery_status: "pending",
          payment_status: "unpaid",
          shippingInfo: "Next Ecomerz Dhaka WeareHose-1216",
          date: tempDate,
        });
      } // end of for
      // creating order for author -->
      await authOrderModel.insertMany(authorOrderData);
      // clearing orderd products from card
      for (let k = 0; k < cardId.length; k++) {
        await cardModel.findByIdAndDelete(cardId[k]);
      }

      setTimeout(() => {
        this.paymentCheck(customerOrder.id);
      }, 86400000);
      responseReturn(res, 201, {
        message: "Order Place Is Successful",
        orderId: customerOrder.id,
      });
      console.log("Order Place Is Successful");
    } catch (error) {
      console.log(error);
    }
  };
  // end of placeholder-->

  get_customer_databorad_data = async (req, res) => {
    const { userId } = req.params;

    try {
      const recentOrders = await customerOrderModel
        .find({
          customerId: new ObjectId(userId),
        })
        .limit(5);

      const pendingOrder = await customerOrderModel
        .find({
          customerId: new ObjectId(userId),
          delivery_status: "pending",
        })
        .countDocuments();
      const totalOrder = await customerOrderModel
        .find({
          customerId: new ObjectId(userId),
        })
        .countDocuments();
      const cancelledOrder = await customerOrderModel
        .find({
          customerId: new ObjectId(userId),
          delivery_status: "cancelled",
        })
        .countDocuments();
      responseReturn(res, 200, {
        recentOrders,
        pendingOrder,
        cancelledOrder,
        totalOrder,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //  ---.

  get_orders = async (req, res) => {
    const { customerId, status } = req.params;

    try {
      let orders = [];
      if (status !== "all") {
        orders = await customerOrderModel.find({
          customerId: new ObjectId(customerId),
          delivery_status: status,
        });
      } else {
        orders = await customerOrderModel.find({
          customerId: new ObjectId(customerId),
        });
      }
      responseReturn(res, 200, {
        orders,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // ===>

  get_order_details = async (req, res) => {
    const { orderId } = req.params;

    try {
      const orderDetails = await customerOrderModel.findById(orderId);
      responseReturn(res, 200, {
        orderDetails,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // ==>

  get_admin_orders = async (req, res) => {
    let { page, perPage, searchValue } = req.query;

    page = parseInt(page);
    console.log(page);
    perPage = parseInt(perPage);
    // Check if page or perPage is NaN, if so, assign default values
    if (isNaN(page) || page <= 0) {
      page = 1; // Default to page 1 if NaN or less than or equal to 0
    }

    if (isNaN(perPage) || perPage <= 0) {
      perPage = 10; // Default to 10 items per page if NaN or less than or equal to 0
    }
    const skipPage = perPage * (page - 1);

    try {
      if (searchValue) {
      } else {
        const orders = await customerOrderModel
          .aggregate([
            {
              $lookup: {
                from: "authororders",
                localField: "_id",
                foreignField: "orderId",
                as: "suborder",
              },
            },
          ])
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalOrder = await customerOrderModel.aggregate([
          {
            $lookup: {
              from: "authororders",
              localField: "_id",
              foreignField: "orderId",
              as: "suborder",
            },
          },
        ]);
        responseReturn(res, 200, {
          orders,
          totalOrder: totalOrder.length,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new orderController();
