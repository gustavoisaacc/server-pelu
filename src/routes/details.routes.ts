import express from "express";
import { body, param } from "express-validator";
import { handleInputError } from "../middleware/validator";
import { createReservation } from "../controllers/detail.controllers";

export const routeDetails = express.Router();

routeDetails.post("/", createReservation);
routeDetails.get("/", createReservation);
