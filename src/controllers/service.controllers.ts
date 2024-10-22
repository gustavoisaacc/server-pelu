import { Service } from "../models/service.models";

export const create = async (req, res) => {
  console.log("🚀 ~ create ~ req.body:", req.body);
  const data = req.body;

  try {
    const service = new Service(req.body);
    service.category = req.category.id;
    req.category.services.push(service.id);
    await Promise.allSettled([service.save(), req.category.save()]);
    return res.json({ message: "Servicio creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el servicio" });
  }
};

export const getAllService = async (req, res) => {
  try {
    const services = await Service.find({ category: req.category.id }).populate(
      "category"
    );
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los servicios" });
  }
};

export const getServiceById = async (req, res) => {
  const id = req.params.id;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    if (service.category.toString() !== req.category.id) {
      return res.status(400).json({ message: "accion no valida" });
    }
    res.json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el servicio" });
  }
};

export const updateService = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    if (service.category.toString() !== req.category.id) {
      return res.status(400).json({ message: "accion no valida" });
    }
    service.name = data.name;
    service.description = data.description;
    service.duration = data.duration;
    service.price = data.price;
    service.discount = data.discount;
    service.isPopular = data.isPopular;
    service.state = data.state;
    await service.save();
    res.json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el servicio" });
  }
};

export const deleteService = async (req, res) => {
  const id = req.params.id;
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    if (service.category.toString() !== req.category.id) {
      return res.status(400).json({ message: "accion no valida" });
    }
    req.category.services = req.category.services.filter(
      (service) => service.toString() !== id
    );
    await Promise.allSettled([service.deleteOne(), req.category.save()]);
    res.json({ message: "Servicio eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el servicio" });
  }
};
