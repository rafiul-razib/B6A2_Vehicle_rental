"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const user_routes_1 = require("./modules/user/user.routes");
const vehicles_routes_1 = require("./modules/vehicles/vehicles.routes");
const bookings_routes_1 = require("./modules/bookings/bookings.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Await database initialization
(0, db_1.default)()
    .then(() => console.log("Database initialized"))
    .catch((err) => console.error("DB init error:", err));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Auth
app.use("/api/v1/auth", auth_routes_1.authRoutes);
// User
app.use("/api/v1/users", user_routes_1.userRouter);
// Vehicles
app.use("/api/v1/vehicles", vehicles_routes_1.vehiclesRouter);
// Bookings
app.use("/api/v1/bookings", bookings_routes_1.bookingRouter);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    });
});
exports.default = app;
