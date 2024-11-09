import type { Request, Response, NextFunction } from "express";
import { Categories, Icategories } from "../models/Category.models";

declare global {
  namespace Express {
    interface Request {
      category: Icategories;
    }
  }
}

export async function validateCategoryExists(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.categoryId;
    const category = await Categories.findById(id);
    if (!category) {
      res.status(400).json({
        message: "Categoria no encontrado",
      });
      return;
    }
    req.category = category;
    next();
  } catch (error) {
    res.status(500).json({ error: "hubo un error" });
  }
}
