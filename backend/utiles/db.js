/** @format */

const mongoose = require("mongoose");

module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    if (mongoose.connection.readyState === 1) {
      console.log("Database connected...");
    } else {
      console.log("Database connection failed.");
    }
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};
