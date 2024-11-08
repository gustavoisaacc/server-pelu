import { uploadAvatar } from "../config/multer";
import { isAuth } from "../middleware/validate";
import { Router } from "express";

import * as userController from "../controllers/user.controllers";
import { body } from "express-validator";
import { handleInputError } from "../middleware/validator";

export const routeProfile = Router();

routeProfile.get("/user", isAuth, userController.user);
routeProfile.post(
  "/new-avatar",
  [isAuth, uploadAvatar],
  userController.uploadUserAvatar
);

routeProfile.get("/avatar", isAuth, userController.getAvatarURL);
routeProfile.put(
  "/edit-user",
  isAuth,
  body("name").notEmpty().withMessage("El campo nombre no debe quedar vacio"),
  body("lastName")
    .notEmpty()
    .withMessage("El campo nombre no debe quedar vacio"),
  body("phone").notEmpty().withMessage("El campo celular no debe quedar vacio"),
  body("direction")
    .notEmpty()
    .withMessage("El campo nombre no debe quedar vacio"),
  body("service")
    .notEmpty()
    .withMessage("El campo nombre no debe quedar vacio"),
  handleInputError,
  userController.editProfile
);
