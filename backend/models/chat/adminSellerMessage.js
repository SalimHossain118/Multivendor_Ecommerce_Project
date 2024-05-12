/** @format */

const { Schema, model } = require("mongoose");

const adminSellerMessageScheam = new Schema(
  {
    senderName: {
      type: String,
      require: true,
    },
    senderId: {
      type: String,
      default: "",
    },
    reciverId: {
      type: String,
      default: "",
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
module.exports = model("seller_admin_message", adminSellerMessageScheam);
