import { sendEmail } from "../config/email";
import { Token } from "../models/Token";
import User from "../models/User.models";
import { hashPassword } from "../utils/hash";
import { generateToken } from "../utils/token";

export const createAccount = async (req, res) => {
  const { password, email } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("El usuario ya esta reguistrado ");
      return res.status(409).json({ message: error.message });
    }
    const user = new User(req.body);
    user.password = await hashPassword(password);

    //generar token de confirmacion de cuenta
    const token = new Token();
    token.token = generateToken();
    token.user = user.id;

    //enviar email
    sendEmail(
      user.email,
      `Confirmación de email para ${user.name}`,
      `Por favor confirma tu email ingresando el siguiente token: ${token.token}`
    );

    await Promise.allSettled([user.save(), token.save()]);
    res.status(200).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};
