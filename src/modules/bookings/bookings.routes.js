"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const bookings_controller_1 = require("./bookings.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/", bookings_controller_1.bookingController.postBooking);
router.get("/", (0, auth_1.default)("admin", "customer"), bookings_controller_1.bookingController.getBookings);
router.put("/:bookingId", (0, auth_1.default)("admin", "customer"), bookings_controller_1.bookingController.updateBooking);
exports.bookingRouter = router;
