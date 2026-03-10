"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesController = void 0;
const vehicles_service_1 = require("./vehicles.service");
const addVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleServices.addVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle inserted successfully!",
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
const getVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleServices.getVehicles();
        res.status(200).json({
            success: true,
            message: "Vehicles info fetched successfully!",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const getSingleVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleServices.getSingleVehicle(req.params.vehicleId);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle info fetched successfully!",
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
const updateVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleServices.updateVehicle(req.body, req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully!",
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
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleServices.deleteVehicle(req.params.vehicleId);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully!",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.vehiclesController = {
    addVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};
