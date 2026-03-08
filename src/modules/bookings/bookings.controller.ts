import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";
import { pool } from "../../config/db";

const postBooking = async (req: Request, res: Response) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

  // Get Rent Duration
  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);

  if (endDate <= startDate) {
    return res.status(400).json({
      success: false,
      message: "rent_end_date must be greater than or equal to rent_start_date",
    });
  }

  // Verify User
  const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    customer_id,
  ]);

  if (user.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "User not available",
    });
  }

  // Get Vehicle Rent Price

  const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id= $1`, [
    vehicle_id,
  ]);

  if (vehicle.rowCount === 0) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found!",
    });
  }

  const { daily_rent_price, vehicle_name, availability_status } =
    vehicle.rows[0];

  if (availability_status === "booked") {
    return res.status(400).json({
      success: false,
      message: "Vehicle is already booked",
    });
  } else {
    // Update Vehicle Status
    await pool.query(
      `UPDATE vehicles SET availability_status =$1 WHERE id= $2`,
      ["booked", vehicle_id],
    );
  }

  // Calculate total rent days
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const totalPrice = daily_rent_price * totalDays;
  try {
    const result = await bookingServices.postBooking(req.body, totalPrice);
    res.status(200).json({
      success: true,
      message: "Vehicle booked successfully!",
      data: {
        ...result.rows[0],
        vehicle: {
          vehicle_name,
          daily_rent_price,
        },
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getBookings();
    const bookings = result.rows.map((row) => ({
      id: row.id,
      customer_id: row.customer_id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      customer: {
        name: row.customer_name,
        email: row.customer_email,
      },
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
      },
    }));
    res.status(200).json({
      success: true,
      message: "All Bookings Retrieved Successfully!",
      data: bookings,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    const result = await bookingServices.updateBooking(
      status,
      req.params.bookingId as string,
    );
    res.status(200).json({
      success: true,
      message: "Booking status updated!!",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingController = {
  postBooking,
  getBookings,
  updateBooking,
};
