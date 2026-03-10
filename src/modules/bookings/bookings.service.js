"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const db_1 = require("../../config/db");
const postBooking = async (payload, total_price) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    const overlappingBooking = await db_1.pool.query(`SELECT FROM bookings
    WHERE vehicle_id = $1
    AND status = "active"
    AND rent_start_date <= $2
    AND rent_end_date >=$3`, [vehicle_id, rent_end_date, rent_start_date]);
    if (overlappingBooking.rows.length > 0) {
        throw new Error("Vehicle already booked for the selected dates");
    }
    const result = await db_1.pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        "active",
    ]);
    await db_1.pool.query(`UPDATE vehicles SET availability_status = 'booked' Where id=$1`, [vehicle_id]);
    return result;
};
const getBookings = async (userRole, userId) => {
    if (userRole !== "admin") {
        const result = await db_1.pool.query(` SELECT 
      b.id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      v.vehicle_name,
      v.registration_number,
      v.type
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id WHERE customer_id=$1`, [userId]);
        return result;
    }
    else {
        const result = await db_1.pool.query(` SELECT 
      b.id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      u.name AS customer_name,
      u.email AS customer_email,
      v.vehicle_name,
      v.registration_number
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id`);
        return result;
    }
};
const updateBooking = async (userRole, status, bookingId, userId) => {
    const booking = await db_1.pool.query(`SELECT * FROM bookings WHERE id=$1`, [
        bookingId,
    ]);
    if (booking.rows.length === 0) {
        throw new Error("Booking not found");
    }
    const data = booking.rows[0];
    const today = new Date();
    const startDate = new Date(data.rent_start_date);
    const endDate = new Date(data.rent_end_date);
    // System
    if (today > endDate && data.status === "active") {
        const result = await db_1.pool.query(`UPDATE bookings SET status = 'returned' WHERE id =$1`, [bookingId]);
        await db_1.pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1`, [data.vehicle_id]);
        return result;
    }
    // Customer
    if (userRole === "customer") {
        if (data.customer_id !== Number(userId)) {
            throw new Error("You cannot cancel someone else's booking");
        }
        if (today >= startDate) {
            throw new Error("Cannot cancel booking after start date");
        }
        const result = await db_1.pool.query(`UPDATE bookings SET status = 'cancelled' WHERE id =$1 RETURNING *`, [bookingId]);
        await db_1.pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id =$1`, [data.vehicle_id]);
        return result;
    }
    // admin
    if (userRole === "admin") {
        const result = await db_1.pool.query(`UPDATE bookings SET status = 'returned' WHERE id = $1 RETURNING *`, [bookingId]);
        await db_1.pool.query(`UPDATE vehicles SET availability_status='available' WHERE id = $1`, [data.vehicle_id]);
        return result;
    }
    throw new Error("Unauthorised action!");
};
exports.bookingServices = {
    postBooking,
    getBookings,
    updateBooking,
};
