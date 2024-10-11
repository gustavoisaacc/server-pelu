import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { initialStat } from "./utils";
import { routeAppointment } from "./routes/appointment.routes";

connectDB();
initialStat();
dotenv.config();

export const app = express();
app.use(express.json());

// Import routes
app.use("/api/v1/appointment", routeAppointment);
