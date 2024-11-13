import { Categories } from "../models/Category.models";

export const create = async (req, res) => {
  console.log("🚀 ~ create ~ req:", req);
  const category = new Categories(req.body);
  console.log("🚀 ~ create ~ req:", req);
  category.manager = req.user.id;
  console.log("🚀 ~ create ~ req:", req);
  try {
    await category.save();
    res.status(201).json({ message: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear la categoria" });
  }
};

export const getAllCategories = async (req, res) => {
  console.log("🚀 ~ getAllCategories ~ req:", req.user.id);

  try {
    const categories = await Categories.find({
      $or: [
        {
          manager: {
            $in: req.user.id,
          },
        },
      ],
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener las categorías" });
  }
};

export const getCategoryById = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Categories.findById(id).populate("services");
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    if (category.manager.toString() !== req.user.id) {
      return res.status(404).json({ message: "Acción no valida" });
    }

    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener la categoría" });
  }
};

export const updateCategory = async (req, res) => {
  console.log("🚀 ~ updateCategory ~ req:", req);
  const id = req.params.id;
  console.log("🚀 ~ updateCategory ~ req:", req);
  const data = req.body;
  console.log("🚀 ~ updateCategory ~ req:", req);

  try {
    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    if (category.manager.toString() !== req.user.id) {
      console.log("🚀 ~ updateCategory ~ req:", req);
      return res.status(404).json({ message: "Acción no valida" });
    }
    category.name = data.name;
    await category.save();
    res.json({ message: "Categoría fue actualizada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar la categoría" });
  }
};

export const deleteCategory = async (req, res) => {
  console.log("🚀 ~ deleteCategory ~ req:", req);
  const id = req.params.id;
  console.log("🚀 ~ deleteCategory ~ req:", req);

  try {
    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    if (category.manager.toString() !== req.user.id) {
      console.log("🚀 ~ deleteCategory ~ req:", req);
      return res.status(404).json({ message: "Acción no valida" });
    }
    await category.deleteOne();
    res.json({ message: "Categoría fue eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar la categoría" });
  }
};
