/** @format */

const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel.js");
const sellersModel = require("../models/sellerModel.js");
const sellersCustomerModel = require("../models/chat/sellerCustomerModel.js");
const { responseReturn } = require("../utiles/response.js");
const { createToken } = require("../utiles/tokenCreate.js");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const { trace } = require("../routes/authRoutes.js");
const sellerModel = require("../models/sellerModel.js");
class authControllers {
  admin_login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
      const admin = await adminModel.findOne({ email }).select("+password");

      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("access_token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Successful" });
        } else {
          responseReturn(res, 400, { error: "Invalied Email or Password" });
        }
        // end of match=>
      } else {
        responseReturn(res, 400, { error: "Email Not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // => end of admin-liogin

  seller_REgistration_controller = async (req, res) => {
    const { email, name, password } = req.body;
    console.log(email);
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const isUserExist = await sellersModel.findOne({ email: email });
      if (isUserExist) {
        responseReturn(res, 404, { error: "Email already exists" });
      } else {
        const createNewSeller = await sellersModel.create({
          name: name,
          email: email,
          password: hashedPassword,
          method: "manual",
          shopInfo: {},
        });
        await sellersCustomerModel.create({ myId: createNewSeller.id });
        const token = await createToken({
          id: createNewSeller.id,
          role: createNewSeller.role,
        });
        res.cookie("access_token", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { token, message: "Registration Successful" });
      }
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: "Internal Server Issue" });
    }
  };

  // end of seller registration=>

  seller_login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
      const seller = await sellersModel.findOne({ email }).select("+password");

      if (seller) {
        const match = await bcrypt.compare(password, seller.password);
        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie("access_token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Successful" });
        } else {
          responseReturn(res, 400, { error: "Invalied Email or Password" });
        }
        // end of match=>
      } else {
        responseReturn(res, 400, { error: "Email Not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // => end of seller-liogin

  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        const seller = await sellersModel.findById(id);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal server error" });
    }
  };
  // end getUser=>>

  seller_Profile_image_upload_controller = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, _, files) => {
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });
      const { image } = files;

      try {
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "sellerProfileImage",
        });

        if (result) {
          await sellersModel.findByIdAndUpdate(id, { image: result.url });
          const userInfo = await sellersModel.findById(id);
          responseReturn(
            res,
            200,
            { message: "Profile Photo Updated" },
            userInfo
          );
        } else {
          responseReturn(res, 404, { error: "image upload failed" });
        }
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  seller_shop_infAdd_controller = async (req, res) => {
    const { busnessname, addressione, addressitwo, city, pcode } = req.body;
    const { id } = req;
    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          busnessname,
          addressione,
          addressitwo,
          city,
          pcode,
        },
      });
      const userInfo = await sellerModel.findById(id);
      responseReturn(res, 201, {
        message: "Profile info add success",
        userInfo,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  logout = async (req, res) => {
    try {
      res.cookie("access_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      responseReturn(res, 200, { message: "logout success" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new authControllers();
