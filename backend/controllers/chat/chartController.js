/** @format */

const adminSellerMessages = require("../../models/chat/adminSellerMessage.js");
const sellerCustomerMessage = require("../../models/chat/sellerCustomerMessageModel.js");
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const customerModel = require("../../models/customerModel");
const sellerModel = require("../../models/sellerModel");
const { responseReturn } = require("../../utiles/response");

class chatController {
  add_customer_friend = async (req, res) => {
    const { sellerId, userId } = req.body;

    try {
      if (sellerId !== "") {
        const seller = await sellerModel.findById(sellerId);
        const user = await customerModel.findById(userId);
        const checkSeller = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: userId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: sellerId,
                },
              },
            },
          ],
        });
        if (!checkSeller) {
          await sellerCustomerModel.updateOne(
            {
              myId: userId,
            },
            {
              $push: {
                myFriends: {
                  fdId: sellerId,
                  name: seller.shopInfo?.shopName,
                  image: seller.image,
                },
              },
            }
          );
        }
        const checkCustomer = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: sellerId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: userId,
                },
              },
            },
          ],
        });

        if (!checkCustomer) {
          await sellerCustomerModel.updateOne(
            {
              myId: sellerId,
            },
            {
              $push: {
                myFriends: {
                  fdId: userId,
                  name: user.name,
                  image: "",
                },
              },
            }
          );
        }
        const messages = await sellerCustomerMessage.find({
          $or: [
            {
              $and: [
                {
                  reciverId: { $eq: sellerId },
                },
                {
                  senderId: { $eq: userId },
                },
              ],
            },
            {
              $and: [
                {
                  reciverId: { $eq: userId },
                },
                {
                  senderId: { $eq: sellerId },
                },
              ],
            },
          ],
        });
        const MyFriends = await sellerCustomerModel.findOne({ myId: userId });
        const currentFd = MyFriends.myFriends.find((s) => s.fdId === sellerId);
        responseReturn(res, 200, {
          myFriends: MyFriends.myFriends,
          currentFd,
          messages,
        });
      } else {
        const MyFriends = await sellerCustomerModel.findOne({ myId: userId });
        responseReturn(res, 200, { myFriends: MyFriends.myFriends });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_message_add = async (req, res) => {
    const { userId, text, sellerId, name } = req.body;

    try {
      const message = await sellerCustomerMessage.create({
        senderId: userId,
        senderName: name,
        reciverId: sellerId,
        message: text,
      });
      const data = await sellerCustomerModel.findOne({ myId: userId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === sellerId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: userId,
        },
        {
          myFriends,
        }
      );
      const data1 = await sellerCustomerModel({ myId: sellerId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((f) => f.fdId === userId);
      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends1[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }

      await sellerCustomerModel.updateOne(
        {
          myId: sellerId,
        },
        {
          myFriends1,
        }
      );
      responseReturn(res, 201, { message });
    } catch (error) {
      console.log(error);
    }
  };

  get_customers = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const data = await sellerCustomerModel.findOne({ myId: sellerId });
      responseReturn(res, 200, { customers: data.myFriends });
    } catch (error) {
      console.log(error);
    }
  };

  get_customer_seller_message = async (req, res) => {
    const { customerId } = req.params;
    const { id } = req;

    try {
      const messages = await sellerCustomerMessage.find({
        $or: [
          {
            $and: [
              {
                reciverId: { $eq: customerId },
              },
              {
                senderId: { $eq: id },
              },
            ],
          },
          {
            $and: [
              {
                reciverId: { $eq: id },
              },
              {
                senderId: { $eq: customerId },
              },
            ],
          },
        ],
      });
      const currentCustomer = await customerModel.findById(customerId);

      responseReturn(res, 200, { messages, currentCustomer });
    } catch (error) {
      console.log(error);
    }
  };

  seller_message_add = async (req, res) => {
    const { senderId, text, reciverId, name } = req.body;
    try {
      const message = await sellerCustomerMessage.create({
        senderId: senderId,
        senderName: name,
        reciverId: reciverId,
        message: text,
      });
      const data = await sellerCustomerModel.findOne({ myId: senderId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === reciverId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: senderId,
        },
        {
          myFriends,
        }
      );
      const data1 = await sellerCustomerModel({ myId: reciverId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((f) => f.fdId === senderId);
      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends1[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }

      await sellerCustomerModel.updateOne(
        {
          myId: reciverId,
        },
        {
          myFriends1,
        }
      );
      responseReturn(res, 201, { message });
    } catch (error) {
      console.log(error);
    }
  };

  get_sellers = async (req, res) => {
    try {
      const sellers = await sellerModel.find({});
      responseReturn(res, 200, { sellers });
    } catch (error) {
      console.log(error);
    }
  };

  seller_admin_message_insert = async (req, res) => {
    const { senderId, reciverId, message, senderName } = req.body;

    try {
      const messageDate = await adminSellerMessages.create({
        senderId,
        reciverId,
        message,
        senderName,
      });
      responseReturn(res, 200, { message: messageDate });
    } catch (error) {
      console.log(error);
    }
  };

  get_admin_messages = async (req, res) => {
    const { reciverId } = req.params;
    const id = "";
    try {
      const messages = await adminSellerMessages.find({
        $or: [
          {
            $and: [
              {
                reciverId: { $eq: reciverId },
              },
              {
                senderId: { $eq: id },
              },
            ],
          },
          {
            $and: [
              {
                reciverId: { $eq: id },
              },
              {
                senderId: { $eq: reciverId },
              },
            ],
          },
        ],
      });
      let currentSeller = {};
      if (reciverId) {
        currentSeller = await sellerModel.findById(reciverId);
      }

      responseReturn(res, 200, { currentSeller, messages });
    } catch (error) {
      console.log(error);
    }
  };

  get_seller_messages = async (req, res) => {
    const reciverId = "";
    const { id } = req;
    try {
      const messages = await adminSellerMessages.find({
        $or: [
          {
            $and: [
              {
                reciverId: { $eq: reciverId },
              },
              {
                senderId: { $eq: id },
              },
            ],
          },
          {
            $and: [
              {
                reciverId: { $eq: id },
              },
              {
                senderId: { $eq: reciverId },
              },
            ],
          },
        ],
      });

      responseReturn(res, 200, { messages });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new chatController();
