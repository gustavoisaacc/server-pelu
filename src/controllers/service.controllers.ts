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
    service.name = data.name || service.name;
    service.description = data.description || service.description;
    service.duration = data.duration || service.duration;
    service.price = data.price || service.price;
    service.discount = data.discount || service.discount;
    service.isPopular = data.isPopular || service.isPopular;
    service.state = data.state || service.state;
    await service.save();
    return res
      .status(200)
      .json({ message: "El servicio fue actualizado correctamente" });
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
    return res.json({ message: "Servicio eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el servicio" });
  }
};
