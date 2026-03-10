import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import checkActiveBookings from "../../middlewares/checkActiveBookings";

const router = Router();

router.get("/", auth("admin"), userController.getAllUsers);

router.get("/:userId", userController.getSingleUser);

router.put("/:userId", auth("admin", "customer"), userController.updateUser);

router.delete(
  "/:userId",
  auth("admin"),
  checkActiveBookings,
  userController.deleteUser,
);

export const userRouter = router;
