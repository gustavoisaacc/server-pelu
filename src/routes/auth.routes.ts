import { Router } from "express";
import * as AuthControler from "../controllers/auth.controllers";
import { handleInputError } from "../middleware/validator";

export const routeAuth = Router();

routeAuth.post("/create-accout", handleInputError, AuthControler.createAccount);
