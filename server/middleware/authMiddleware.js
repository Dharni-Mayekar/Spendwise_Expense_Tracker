const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("Received Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log("User:", req.user);

      if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      next();
    } catch (error) {
      console.log("JWT ERROR:", error.message);

      return res.status(401).json({
        message: "Not authorized",
      });
    }
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

module.exports = { protect };