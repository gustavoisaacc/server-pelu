import { Avatar } from "../models/Avatar";
import fs from "fs";
import path from "path";
import User from "../models/User.models";
import { Appointment } from "../models/Appointment.models";

export const user = (req, res) => {
  return res.json(req.user);
};

export const uploadUserAvatar = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Por favor, sube una imagen válida" });
    }

    // Verifica que el usuario exista
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crea o actualiza el avatar en el modelo Avatar
    const avatarUrl = `uploads/avatars/${req.file.filename}`;
    let avatar = await Avatar.findOne({ user: userId });

    if (avatar) {
      // Obtiene la ruta del archivo antiguo
      const oldAvatarPath = path.join(__dirname, "..", avatar.url);
      // Elimina el archivo antiguo si existe
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
      // Si el avatar ya existe, actualiza la URL
      avatar.url = avatarUrl;
      await avatar.save();
    } else {
      // Si no existe, crea un nuevo registro de avatar
      avatar = new Avatar({
        user: userId,
        url: avatarUrl,
      });
      await avatar.save();
    }

    res.status(200).json({ message: "Avatar subido exitosamente" });
  } catch (error) {
    console.error("Error subiendo avatar:", error);
    res
      .status(500)
      .json({ message: `Error al subir el avatar: ${error.message}` });
  }
};

export const getAvatarURL = async (req, res) => {
  try {
    const user = req.user.id;
    const avatar = await Avatar.findOne({ user });
    if (!user) {
      const error = new Error("Usuario no valido");
      return res.status(401).json({ message: error.message });
    }
    const avatarUrl = `${req.protocol}://${req.get("host")}/${avatar.url}`;
    res.status(200).json({ url: avatarUrl });
  } catch (error) {
    console.error("Error subiendo avatar:", error);
    res
      .status(500)
      .json({ message: `Error al subir el avatar: ${error.message}` });
  }
};

export const editProfile = async (req, res) => {
  const { name, lastName, phone, direction, service } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    user.name = name;
    user.lastName = lastName;
    user.phone = phone;
    user.direction = direction;
    user.service = service;
    await user.save();
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al actualizar usuario: ${error.message}` });
  }
};

export const getAllUser = async (req, res) => {
  try {
    // Obtener todos los usuarios con sus nombres y apellidos, usando _id en lugar de id, y convertir los documentos a objetos JS simples
    const users = await User.find().select("_id name lastName").lean();

    // Mapear cada usuario para agregar el URL del avatar correspondiente
    const usersWithAvatars = await Promise.all(
      users.map(async (user) => {
        // Buscar el avatar asociado con el usuario actual
        const avatar = await Avatar.findOne({ user: user._id })
          .select("url")
          .lean();

        // Retornar el usuario con el avatar URL
        return {
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          avatarUrl: avatar ? avatar.url : null, // Asegura que se incluya el URL o null si no existe avatar
        };
      })
    );

    res.json(usersWithAvatars);
  } catch (error) {
    console.error("Error al obtener los usuarios y avatares:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios y avatares" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return;
    }
    const avatar = await Avatar.find({ user: req.params.id });
    const appointment = await Appointment.find({ manager: req.params.id });

    const fullUser = {
      user,
      avatar,
      appointment,
    };
    res.json(fullUser);
  } catch (error) {}
};
