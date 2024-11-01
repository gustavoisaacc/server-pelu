import { Router } from "express";
import * as AuthControler from "../controllers/auth.controllers";
import { handleInputError } from "../middleware/validator";
import { body, param } from "express-validator";

export const routeAuth = Router();

routeAuth.post(
  "/create-account",
  body("name").notEmpty().withMessage("El campo es obligatorio"),
  body("lastName").notEmpty().withMessage("El campo es obligatorio"),
  body("phone").notEmpty().withMessage("El campo es obligatorio"),
  body("direction").notEmpty().withMessage("El campo es obligatorio"),
  body("email").isEmail().withMessage("El campo es obligatorio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password debe contener minimo 8 caracteres"),
  body("confirmation_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los password no son iguales");
    }
    return true;
  }),
  body("service").notEmpty().withMessage("El campo es obligatorio"),
  handleInputError,
  AuthControler.createAccount
);

routeAuth.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("Debe ingresar un token"),
  handleInputError,
  AuthControler.confirmAccount
);

routeAuth.post(
  "/login",
  body("email").isEmail().withMessage("El E-mail no es valido"),
  body("password").notEmpty().withMessage("El Password es obligatorio"),
  handleInputError,
  AuthControler.login
);
routeAuth.post(
  "/request-code",
  body("email").isEmail().withMessage("El E-mail no es valido"),
  handleInputError,
  AuthControler.requestCode
);
routeAuth.post(
  "/forgot-password",
  body("email").isEmail().withMessage("El E-mail no es valido"),
  handleInputError,
  AuthControler.forgotPassword
);
routeAuth.post(
  "/validate-token",
  body("token").notEmpty().withMessage("Debe ingresar un token"),
  handleInputError,
  AuthControler.ValidateTokenToChangePassword
);

routeAuth.post(
  "/update-password/:token",
  param("token").isNumeric().withMessage("token no valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password debe contener minimo 8 caracteres"),
  body("confirmation_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los password no son iguales");
    }
    return true;
  }),
  handleInputError,
  AuthControler.newPassword
);
