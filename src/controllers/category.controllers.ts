import { Categories } from "../models/Category.models";

export const create = async (req, res) => {
  try {
    const category = new Categories(req.body);
    await category.save();
    res.status(201).json({ message: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear la categpria" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
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
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener la categoría" });
  }
};

export const updateCategory = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
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
  const id = req.params.id;

  try {
    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    await category.deleteOne();
    res.json({ message: "Categoría fue eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar la categoría" });
  }
};
