"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_service_1.authServices.signin(email, password);
        res.status(201).json({
            success: true,
            message: "Logged in successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const signup = async (req, res) => {
    console.log(req.body);
    try {
        const result = await auth_service_1.authServices.signup(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.authController = {
    signin,
    signup,
};
