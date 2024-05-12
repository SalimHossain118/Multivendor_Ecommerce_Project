/** @format */

const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    return res.status(409).json({ error: "Please Login to continue" });
  } else {
    try {
      const decodedToken = jwt.verify(access_token, process.env.SECRET_KEY);
      req.role = decodedToken.role;
      req.id = decodedToken.id;
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(409)
        .json({ error: "Login is required, Credentials is Expired" });
    }
  }
};
