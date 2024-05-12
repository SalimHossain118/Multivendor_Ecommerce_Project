/** @format */

const { Schema, model } = require("mongoose");

const sellerCustomerMessageScheam = new Schema(
  {
    senderName: {
      type: String,
      require: true,
    },
    senderId: {
      type: String,
      require: true,
    },
    reciverId: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "unseen",
    },
  },
  { timestamps: true }
);
module.exports = model("seller_customer_message", sellerCustomerMessageScheam);
