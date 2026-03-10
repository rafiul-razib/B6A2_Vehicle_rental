"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const checkActiveBookings = async (req, res, next) => {
    try {
        const result = await db_1.pool.query(`SELECT * FROM bookings WHERE customer_id = $1 AND status= 'active'`, [req.params.userId]);
        if (result.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User has active booking and cannot be deleted",
            });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.default = checkActiveBookings;
