/** @format */
const sellerModel = require("../../models/sellerModel");
const { responseReturn } = require("../../utiles/response");

class sellerController {
  get_seller_request_controller = async (req, res) => {
    const { perPage, page, searchValue } = req.query;
    const skipPage = parseInt(perPage) * (parseInt(page) - 1);
    try {
      if (searchValue) {
        //const seller
      } else {
        const sellers = await sellerModel
          .find({ status: "pending" })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalSeller = await sellerModel
          .find({ status: "pending" })
          .countDocuments();
        responseReturn(res, 200, { totalSeller, sellers });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  //=>

  get_seller_info_controller = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const seller = await sellerModel.findById(sellerId);

      if (!seller) {
        return res.status(404).json({ error: "Seller not found" });
      }

      res.status(200).json({ seller });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };

  seller_status_update_controller = async (req, res) => {
    const { sellerId, status } = req.body;
    try {
      await sellerModel.findByIdAndUpdate(sellerId, { status });
      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, { seller, message: "Seller Status updated" });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
  // ==>
  get_active_sellers_controller = async (req, res) => {
    let { perPage, page, searchValue } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);
    const skipPage = perPage * (page - 1);
    try {
      let query = { status: "active" };
      if (searchValue) {
        // Use a regular expression to match documents where the 'name' field starts with the search value
        query.$or = [
          { name: { $regex: "^" + searchValue, $options: "i" } },
          { email: { $regex: "^" + searchValue, $options: "i" } },
        ];
      }

      const sellersQuery = sellerModel
        .find(query)
        .skip(skipPage)
        .limit(perPage)
        .sort({ createdAt: -1 });

      // If no search value provided, we can omit the additional condition and count all active sellers
      const totalSellerQuery = searchValue
        ? sellerModel.find(query).countDocuments()
        : sellerModel.countDocuments({ status: "active" });

      const [totalSeller, sellers] = await Promise.all([
        totalSellerQuery,
        sellersQuery,
      ]);

      responseReturn(res, 200, { totalSeller, sellers });
    } catch (error) {
      console.log("active seller get " + error.message);
    }
  };

  // ==>

  get_deActive_sellers_controller = async (req, res) => {
    let { perPage, page, searchValue } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);
    const skipPage = perPage * (page - 1);
    try {
      let query = { status: "deactive" };
      if (searchValue) {
        // Use a regular expression to match documents where the 'name' field starts with the search value
        query.$or = [
          { name: { $regex: "^" + searchValue, $options: "i" } },
          { email: { $regex: "^" + searchValue, $options: "i" } },
        ];
      }

      const sellersQuery = sellerModel
        .find(query)
        .skip(skipPage)
        .limit(perPage)
        .sort({ createdAt: -1 });

      // If no search value provided, we can omit the additional condition and count all active sellers
      const totalSellerQuery = searchValue
        ? sellerModel.find(query).countDocuments()
        : sellerModel.countDocuments({ status: "deactive" });

      const [totalDeactiveSeller, deactiveSellers] = await Promise.all([
        totalSellerQuery,
        sellersQuery,
      ]);

      responseReturn(res, 200, { totalDeactiveSeller, deactiveSellers });
    } catch (error) {
      console.log("active seller get " + error.message);
    }
  };

  // ==>
}

module.exports = new sellerController();
