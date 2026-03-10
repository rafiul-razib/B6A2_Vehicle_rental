"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Data fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
const getSingleUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getSingleUser(req.params.userId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User fetched successfully!",
                data: result.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.deleteUser(req.params.userId);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: result.rows,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const updateUser = async (req, res) => {
    const { name, role, email, phone } = req.body;
    const userRole = req.user.role;
    let updatedRole = role;
    if (userRole !== "admin") {
        updatedRole = undefined;
    }
    try {
        const result = await user_service_1.userServices.updateUser(name, email, updatedRole, phone, req.params.userId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: result.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.userController = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};
