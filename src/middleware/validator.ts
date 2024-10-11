import type { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  next();
};
