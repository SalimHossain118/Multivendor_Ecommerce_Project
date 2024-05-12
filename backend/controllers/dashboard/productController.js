/** @format */
const productModel = require("../../models/productModel.js");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response.js");
class productsController {
  //
  //
  add_products = async (req, res) => {
    const { id: sellerId } = req;

    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      if (err) {
        responseReturn(res, 404, { err: "Something went wrong" });
      } else {
        let {
          name,
          category,
          description,
          stock,
          price,
          discount,
          shopName,
          brand,
        } = field;
        const { images } = files;
        name = name.trim();
        const slug = name.split("").join("-");

        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key,
          api_secret: process.env.api_secret,
          secure: true,
        });

        try {
          let allImageUrl = [];

          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(
              images[i].filepath,
              { folder: "products" }
            );
            allImageUrl = [...allImageUrl, result.url];
          }

          const product = await productModel.create({
            sellerId: sellerId,
            name,
            slug,
            shopName,
            category: category.trim(),
            description: description.trim(),
            stock: parseInt(stock),
            price: parseInt(price),
            discount: parseInt(discount),
            images: allImageUrl,
            brand: brand.trim(),
          });
          responseReturn(res, 201, { product, message: "product add success" });
        } catch (error) {
          responseReturn(res, 500, { error: error.message });
        }
        // end of cathch
      }
      //   end of else=>
    });
  };

  get_products = async (req, res) => {
    const { perPage, page, searchValue } = req.query;
    const { id } = req;
    const skipPage = parseInt(perPage) * (parseInt(page) - 1);
    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalProducts = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { products, totalProducts });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalProducts = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { products, totalProducts });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getA_productsContro = async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await productModel.findById(productId);
      console.log(product);
      responseReturn(res, 200, { product });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // ==> end of getA_productsContro

  update_product = async (req, res) => {
    let {
      name,
      description,
      discount,
      shopName,
      stock,
      price,
      brand,
      productId,
    } = req.body;
    name = name.trim();
    const slug = name.split("").join("-");

    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        slug,
        description,
        discount,
        shopName,
        stock,
        price,
        brand,
        productId,
      });
      const updatedProduct = await productModel.findById(productId).lean();
      responseReturn(res, 200, {
        updatedProduct,
        message: "product update success",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // end of update product=>

  product_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      const { productId, oldImage } = field;
      const { newImage } = files;

      if (err) {
        console.error(err);
        responseReturn(res, 404, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });

          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "products",
          });
          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;
            await productModel.findByIdAndUpdate(productId, {
              images,
            });
            const updatedProduct = await productModel
              .findById(productId)
              .lean();
            responseReturn(res, 200, {
              updatedProduct,
              message: "product images update success",
            });
          } else {
            responseReturn(res, 400, { error: "product images update failed" });
          }
        } catch (error) {
          console.error(error);
          responseReturn(res, 500, { error: error.message });
        }
      }
    }); // end
  };
}

module.exports = new productsController();
