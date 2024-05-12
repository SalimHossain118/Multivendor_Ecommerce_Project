/** @format */
const categoryModel = require("../../models/categoryModel.js");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response.js");
class categoryController {
  add_category = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { err: "Something went wrong" });
      } else {
        let { name } = fields;
        let { image } = files;
        name = name.trim();
        const slug = name.split("").join("-");

        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key,
          api_secret: process.env.api_secret,
          secure: true,
        });
        try {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categories",
          });
          if (result) {
            const category = await categoryModel.create({
              name,
              slug,
              image: result.url,
            });
            responseReturn(res, 201, {
              category,
              message: "Category Added Successfully ",
            });
          } else {
            responseReturn(res, 404, { err: "Image Upload Failed" });
          }
        } catch (error) {
          responseReturn(res, 500, { err: "Internal Server Error" });
        }
      }
    });
  };

  get_category = async (req, res) => {
    const { perPage, page, searchValue } = req.query;

    try {
      let skipPage = "";
      if (perPage && page) {
        skipPage = parseInt(perPage) * (parseInt(page) - 1);
      }

      if (searchValue && page && perPage) {
        const categories = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalCategories = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { categories, totalCategories });
      } else if (searchValue === "" && page && perPage) {
        const categories = await categoryModel
          .find({})
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalCategories = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { categories, totalCategories });
      } else {
        const categories = await categoryModel.find({}).sort({ createdAt: -1 });
        const totalCategories = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { categories, totalCategories });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new categoryController();
