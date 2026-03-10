import { NextFunction, Request, Response } from "express";
import { pool } from "../config/db";

const checkActiveBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await pool.query(
      `SELECT * FROM bookings WHERE customer_id = $1 AND status= 'active'`,
      [req.params.userId],
    );
    if (result.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User has active booking and cannot be deleted",
      });
    } else {
      next();
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default checkActiveBookings;
