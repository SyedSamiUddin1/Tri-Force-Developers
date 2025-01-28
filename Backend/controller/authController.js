const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                message: "Email already registered",
            });
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            status: "success",
            message: "Registration successful",
            data: {
                id: user._id,
                email: user.email,
                twoFactorEnabled: user.twoFactorEnabled,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error during registration" });
        console.log(error);
    }
};
exports.setup2FA = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const secret = speakeasy.generateSecret({
            name: `2fa:${user.email}`,
        });

        const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

        user.twoFactorSecret = secret.base32;
        await user.save();

        res.json({
            secret: secret.base32,
            qrCode: qrCodeUrl,
        });
    } catch (error) {
        res.status(500).json({ message: "Error setting up 2FA" });
    }
};
exports.verify2FASetup = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findById(req.userId);

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: "base32",
            token,
        });

        if (!verified) {
            return res.status(400).json({ message: "Invalid token" });
        }

        user.twoFactorEnabled = true;
        await user.save();

        res.json({ message: "2FA enabled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error verifying 2FA" });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.twoFactorEnabled) {
            return res.status(200).json({
                message: "2FA required",
                require2FA: true,
                userId: user._id,
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        // Set cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });

        res.json({
            message: "Login successful",
            token: jwtToken,
            user: {
                id: user._id,
                email: user.email,
                twoFactorEnabled: user.twoFactorEnabled,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error during login" });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie("token").json({ message: "Logout successful" });
};
exports.verify2FALogin = async (req, res) => {
    try {
        const { userId, tokenOtp } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: "base32",
            token: tokenOtp,
        });

        if (!verified) {
            return res.status(401).json({ message: "Invalid 2FA token" });
        }

        // Generate JWT token
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        // Set cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });

        res.json({
            message: "2FA verification successful",
            token: jwtToken,
            user: {
                id: user._id,
                email: user.email,
                twoFactorEnabled: user.twoFactorEnabled,
            },
        });
    } catch (error) {
        console.error("2FA verification error:", error);
        res.status(500).json({ message: "Error during 2FA verification" });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select(
            "-password -twoFactorSecret"
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            status: "success",
            user,
        });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ message: "Error retrieving user data" });
    }
};
