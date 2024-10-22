import express from "express";
import * as ServiceController from "../controllers/service.controllers";
import { body, param } from "express-validator";
import { handleInputError } from "../middleware/validator";

export const routeService = express.Router();

routeService.post(
  "/",
  body("name").isEmpty().withMessage("El nombre es obligator"),
  body("description").isEmpty().withMessage("La description es obligator"),
  body("duration").isNumeric().withMessage("La duración debe ser un número"),
  body("price").isNumeric().withMessage("El precio debe ser un número"),
  body("discount").isNumeric().withMessage("El descuento debe ser un número"),
  body("isPopular")
    .isBoolean()
    .withMessage("El campo 'isPopular' debe ser un booleano"),
  body("category")
    .isMongoId()
    .withMessage("El campo 'category' debe ser un id válido"),
  handleInputError,
  ServiceController.create
);

routeService.get("/", ServiceController.getAllService);

routeService.get(
  "/:id",
  param("id").isMongoId().withMessage("El id no es valido"),
  ServiceController.getServiceById
);

routeService.put(
  "/:id",
  param("id").isMongoId().withMessage("El id no es valido"),
  body("name").isEmpty().withMessage("El nombre es obligator"),
  body("description").isEmpty().withMessage("La description es obligator"),
  body("duration").isNumeric().withMessage("La duración debe ser un número"),
  body("price").isNumeric().withMessage("El precio debe ser un número"),
  body("discount").isNumeric().withMessage("El descuento debe ser un número"),
  body("isPopular")
    .isBoolean()
    .withMessage("El campo 'isPopular' debe ser un booleano"),
  body("category")
    .isMongoId()
    .withMessage("El campo 'category' debe ser un id válido"),
  handleInputError,
  ServiceController.updateCategory
);

routeService.delete(
  "/:id",
  param("id").isMongoId().withMessage("El id no es valido"),
  ServiceController.deleteService
);
