import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";

const router = Router();

router.post("/", vehiclesController.addVehicle);
router.get("/", vehiclesController.getVehicles);
router.get("/:vehicleId", vehiclesController.getSingleVehicle);
router.put("/:vehicleId", vehiclesController.updateVehicle);
router.delete("/:vehicleId", vehiclesController.deleteVehicle);

export const vehiclesRouter = router;
