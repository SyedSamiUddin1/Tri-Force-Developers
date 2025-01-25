const express = require("express");
const router = express.Router();
const ProtectedRoutes = require("../middleware/protectedRoutes");
const {
  register,
  login,
  logout,
  setup2FA,
  verify2FASetup,
  getUser,
} = require("../controller/authController");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", ProtectedRoutes, logout);
router.get("/getUser", ProtectedRoutes, getUser);
router.post("/setup2FA", ProtectedRoutes, setup2FA);
router.post("/verify2FA", ProtectedRoutes, verify2FASetup);
module.exports = router;
