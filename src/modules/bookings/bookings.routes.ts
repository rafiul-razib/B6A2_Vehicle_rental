import { Router } from "express";
import { bookingController } from "./bookings.controller";

const router = Router();

router.post("/", bookingController.postBooking);
router.get("/", bookingController.getBookings);
router.put("/:bookingId", bookingController.updateBooking);

export const bookingRouter = router;
