import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/user/user.routes";
import { vehiclesRouter } from "./modules/vehicles/vehicles.routes";
import { bookingRouter } from "./modules/bookings/bookings.routes";

const app = express();

app.use(express.json());

// Await database initialization
initDB()
  .then(() => console.log("Database initialized"))
  .catch((err) => console.error("DB init error:", err));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Auth
app.use("/api/v1/auth", authRoutes);

// User
app.use("/api/v1/users", userRouter);

// Vehicles
app.use("/api/v1/vehicles", vehiclesRouter);

// Bookings
app.use("/api/v1/bookings", bookingRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
