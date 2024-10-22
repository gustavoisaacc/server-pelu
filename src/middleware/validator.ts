import type { Response, Request, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";

export const handleInputError: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
