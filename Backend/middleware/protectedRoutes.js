const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const ProtectedRoutes = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "User is not Logged In" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = ProtectedRoutes;
