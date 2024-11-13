import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { UserType } from "../models/User.models";

declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "No Autorizado" });
    return;
  }
  const [, token] = bearer.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.id) {
      const { id } = decoded;
      const user = await User.findById(id).select("-password");
      console.log("🚀 ~ isAuth ~ user:", user);
      if (!user) {
        res.status(401).json({
          message: "Usuario no autorizado. Usuario no encontrado.",
        });
        return;
      }
      req.user = user;
    }
  } catch (error) {
    res.status(500).json({ message: "Token no valido" });
  }
  next();
}
