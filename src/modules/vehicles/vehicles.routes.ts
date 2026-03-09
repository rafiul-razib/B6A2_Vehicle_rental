import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth("admin"), vehiclesController.addVehicle);
router.get("/", vehiclesController.getVehicles);
router.get("/:vehicleId", vehiclesController.getSingleVehicle);
router.put("/:vehicleId", auth("admin"), vehiclesController.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehiclesController.deleteVehicle);

export const vehiclesRouter = router;
