import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import { connectDB } from "./config/db";
import { routeAppointment } from "./routes/appointment.routes";
import { routeCategory } from "./routes/category.routes";
import { configCors } from "./config/cors";
import { routeAuth } from "./routes/auth.routes";
import multer from "multer";
import { routeProfile } from "./routes/profile.routes";
import { routeDetails } from "./routes/details.routes";
import { routeP } from "./routes/mp.routes";

connectDB();
dotenv.config();

export const app = express();
app.use(cors(configCors));

app.use(morgan("dev"));

//leer datos del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/auth", routeAuth);
app.use("/api/v1/appointment", routeAppointment);
app.use("/api/v1/category", routeCategory);
app.use("/api/v1/", routeProfile);
app.use("/api/v1/detail", routeDetails);
app.use("/mp", routeP)

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Error de multer (por ejemplo, si el archivo es incorrecto)
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Otro tipo de error
    return res.status(500).json({ message: err.message });
  }
  next();
});
