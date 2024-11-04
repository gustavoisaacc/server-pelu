import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db";
import { initialStatCategory } from "./utils";
import { routeAppointment } from "./routes/appointment.routes";
import { routeCategory } from "./routes/category.routes";
import { configCors } from "./config/cors";
import { routeAuth } from "./routes/auth.routes";

connectDB();
dotenv.config();

export const app = express();
app.use(cors(configCors));

app.use(morgan("dev"));

//leer datos del formulario
app.use(express.json());

// Import routes
app.use("/api/v1/auth", routeAuth);
app.use("/api/v1/appointment", routeAppointment);
app.use("/api/v1/category", routeCategory);
