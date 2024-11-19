import express from "express";
import { body, param } from "express-validator";
import { handleInputError } from "../middleware/validator";
import {
  createReservation,
  getDetailAppointmentFromClient,
} from "../controllers/detail.controllers";
import { isAuth } from "../middleware/validate";

export const routeDetails = express.Router();

routeDetails.post("/", createReservation);
routeDetails.get("/", isAuth, getDetailAppointmentFromClient);
