const express = require("express");
const router = express.Router();
const ProtectedRoutes = require("../middleware/protectedRoutes");
const {
    register,
    login,
    logout,
    setup2FA,
    verify2FASetup,
} = require("../controller/authController");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", ProtectedRoutes, logout);
router.post("/setup2FA", ProtectedRoutes, setup2FA);
router.post("/verify2FA", ProtectedRoutes, verify2FASetup);
module.exports = router;
