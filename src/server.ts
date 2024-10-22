import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { initialStatCategory } from "./utils";
import { routeAppointment } from "./routes/appointment.routes";
import { routeCategory } from "./routes/category.routes";

connectDB();
initialStatCategory();
dotenv.config();

export const app = express();
app.use(express.json());

// Import routes
app.use("/api/v1/appointment", routeAppointment);
app.use("/api/v1/category", routeCategory);
