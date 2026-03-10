import { Router } from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", bookingController.postBooking);
router.get("/", auth("admin", "customer"), bookingController.getBookings);
router.put("/:bookingId", bookingController.updateBooking);

export const bookingRouter = router;
