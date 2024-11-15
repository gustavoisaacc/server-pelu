import express from "express";
import * as appointmentController from "../controllers/appointment.controllers";
import { body, param } from "express-validator";
import { handleInputError } from "../middleware/validator";
import { isAuth } from "../middleware/validate";

// Define el router para las rutas de los turnos de cita.
export const routeAppointment = express.Router();
routeAppointment.use(isAuth);
routeAppointment.post(
  "/",
  body("date")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("Formato de fecha inválido. Utiliza un formato ISO 8601.")
    .custom((value) => {
      const selectedDate = new Date(value);

      // Obtener la fecha y hora actual en UTC
      const now = new Date();

      // Obtener la fecha actual en Argentina (GMT-3)
      const today = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0, // Horas
        0, // Minutos
        0, // Segundos
        0 // Milisegundos
      );

      // Ajustar la fecha de hoy para GMT-3
      today.setHours(today.getHours() - 3);

      // Comparar las fechas
      if (selectedDate < today) {
        throw new Error(
          "La fecha seleccionada ya ha pasado. Por favor, elige una fecha válida."
        );
      }

      // Permitir la selección de la misma fecha
      if (selectedDate.getTime() === today.getTime()) {
        return true; // Si es hoy, es válido
      }

      return true; // Si es una fecha futura, es válido
    }),
  body("startTime")
    .exists()
    .withMessage("La hora de inicio es obligatoria.")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Formato de hora inválido. Usa HH:MM en formato 24 horas.")
    .custom((value) => {
      const [hour, minute] = value.split(":").map(Number);
      if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        throw new Error(
          "La hora no es válida. Debe estar entre 00:00 y 23:59."
        );
      }
      return true;
    }),
  body("delay").notEmpty().withMessage("El retraso es obligatorio"),
  handleInputError,
  appointmentController.create
);

routeAppointment.get("/", appointmentController.getAllAppointments);
routeAppointment.get(
  "/:id",
  param("id").isMongoId().withMessage("id no existe"),
  handleInputError,
  appointmentController.getAppointmentsById
);
routeAppointment.put(
  "/:id",
  param("id").isMongoId().withMessage("id no existe"),
  body("date")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .custom((value) => {
      const selectedDate = new Date(value);

      // Obtener la fecha y hora actual en UTC
      const now = new Date();

      // Obtener la fecha actual en Argentina (GMT-3)
      const today = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0, // Horas
        0, // Minutos
        0, // Segundos
        0 // Milisegundos
      );

      // Ajustar la fecha de hoy para GMT-3
      today.setHours(today.getHours() - 3);

      // Comparar las fechas
      if (selectedDate < today) {
        throw new Error(
          "La fecha seleccionada ya ha pasado. Por favor, elige una fecha válida."
        );
      }

      // Permitir la selección de la misma fecha
      if (selectedDate.getTime() === today.getTime()) {
        return true; // Si es hoy, es válido
      }

      return true; // Si es una fecha futura, es válido
    }),
  body("startTime")
    .exists()
    .withMessage("La hora de inicio es obligatoria.")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Formato de hora inválido. Usa HH:MM en formato 24 horas.")
    .custom((value) => {
      const [hour, minute] = value.split(":").map(Number);

      // Validación de horas
      if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        throw new Error(
          "La hora no es válida. Debe estar entre 00:00 y 23:59."
        );
      }

      // Validación de intervalos de 30 minutos (múltiplos de 30 minutos)
      if (minute % 30 !== 0) {
        throw new Error("La hora debe ser un múltiplo de 30 minutos.");
      }

      return true;
    }),
  body("delay").notEmpty().withMessage("El retraso es obligatorio"),
  handleInputError,
  appointmentController.updateAppointment
);

routeAppointment.delete(
  "/:id",
  param("id").isMongoId().withMessage("id no existe"),
  handleInputError,
  appointmentController.deleteAppointment
);
