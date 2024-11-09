import express from "express";
import { body, param } from "express-validator";
import { handleInputError } from "../middleware/validator";

import * as CategoryController from "../controllers/category.controllers";
import * as serviceController from "../controllers/service.controllers";
import { validateCategoryExists } from "../middleware/category";
import { Service } from "../models/service.models";
import { isAuth } from "../middleware/validate";

export const routeCategory = express.Router();
routeCategory.use(isAuth);
routeCategory.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),
  handleInputError,
  CategoryController.create
);

routeCategory.get("/", CategoryController.getAllCategories);
routeCategory.get(
  "/:id",
  param("id").isMongoId().withMessage("id no válido"),
  handleInputError,
  CategoryController.getCategoryById
);

routeCategory.put(
  "/:id",
  param("id").isMongoId().withMessage("id no válido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),
  handleInputError,
  CategoryController.updateCategory
);

routeCategory.delete(
  "/:id",
  param("id").isMongoId().withMessage("id no válido"),
  handleInputError,
  CategoryController.deleteCategory
);

routeCategory.post(
  "/:categoryId/service",
  validateCategoryExists,
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligator")
    .custom(async (name) => {
      const existingCategory = await Service.findOne({ name });
      if (existingCategory) {
        throw new Error("El nombre ya existe en la base de datos");
      }
    }),
  body("description").notEmpty().withMessage("La description es obligator"),
  body("price").isNumeric().withMessage("El precio debe ser un número"),
  handleInputError,
  serviceController.create
);

routeCategory.get(
  "/:categoryId/service",
  validateCategoryExists,
  serviceController.getAllService
);
routeCategory.get(
  "/:categoryId/service/:id",
  validateCategoryExists,
  serviceController.getServiceById
);

routeCategory.put(
  "/:categoryId/service/:id",
  validateCategoryExists,
  param("id").isMongoId().withMessage("id no válido"),
  body("name").notEmpty().withMessage("El nombre es obligator"),
  body("description").notEmpty().withMessage("La description es obligator"),
  body("price").isNumeric().withMessage("El precio debe ser un número"),
  handleInputError,
  serviceController.updateService
);

routeCategory.delete(
  "/:categoryId/service/:id",
  validateCategoryExists,
  param("id").isMongoId().withMessage("id no válido"),
  handleInputError,
  serviceController.deleteService
);
