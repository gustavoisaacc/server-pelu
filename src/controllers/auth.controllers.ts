import { sendEmail, sendPasswordResetToken } from "../config/email";
import { Token } from "../models/Token";
import User from "../models/User.models";
import { checkPassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/token";
import { generateJWT } from "../utils/jwt";

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
      `${user.name} ${user.lastName}`,
      `Confirmación de cuenta`,
      `Por favor confirma tu email ingresando el siguiente token: <br/> <strong> ${token.token} </strong>`
    );

    await Promise.allSettled([user.save(), token.save()]);
    res.status(200).json({
      message: "Usuario creado exitosamente, revisa tu e-mail para confirmar",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const confirmAccount = async (req, res) => {
  const { token } = req.body;
  try {
    const isTokenexists = await Token.findOne({ token });
    if (!isTokenexists) {
      const error = new Error("Token no valido");
      return res.status(401).json({ message: error.message });
    }
    const user = await User.findById({ _id: isTokenexists.user });
    if (!user) {
      const error = new Error("Usuario no valido");
      return res.status(404).json({ message: error.message });
    }
    user.confirm = true;
    await Promise.allSettled([user.save(), isTokenexists.deleteOne()]);
    res.status(200).json({ message: "usuario confirmado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Por favor revise su email o password");
      return res.status(401).json({ message: error.message });
    }
    const isPassworCorreact = await checkPassword(password, user.password);
    if (!isPassworCorreact) {
      const error = new Error("Por favor revise su email o password");
      return res.status(401).json({ message: error.message });
    }
    if (!user.confirm) {
      const error = new Error("Resiva el email y confirma tu cuneta");
      return res.status(401).json({ message: error.message });
    }

    const token = generateJWT({ id: user.id.toString() });

    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error de credenciales del usuario" });
  }
};

export const requestCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("El usuario no esta registrado ");
      return res.status(409).json({ message: error.message });
    }

    if (user.confirm) {
      const error = new Error("El usuario ya esta confirmado ");
      return res.status(409).json({ message: error.message });
    }

    //generar un nuevo token de confirmacion de cuenta
    const token = new Token();
    token.token = generateToken();
    token.user = user.id;

    //enviar email
    sendEmail(
      user.email,
      `${user.name} ${user.lastName}`,
      `Confirmación de cuenta`,
      `Por favor confirma tu email ingresando el siguiente token: <br/> <strong> ${token.token} </strong>`
    );

    await Promise.allSettled([user.save(), token.save()]);
    res.status(200).json({
      message: "Enviamos un nuevo token, revisa tu e-mail para confirmar",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("El usuario no esta registrado ");
      return res.status(409).json({ message: error.message });
    }

    //generar un nuevo token de confirmacion de cuenta
    const token = new Token();
    token.token = generateToken();
    token.user = user.id;
    await token.save();

    //enviar email
    sendPasswordResetToken(
      user.email,
      `${user.name} ${user.lastName}`,
      `Restablecer Password`,
      `has solicitado reestablecer el password, ingresa el sigiente token: <br/> <strong> ${token.token} </strong>`
    );

    res.status(200).json({
      message:
        "Enviamos un nuevo token, revisa tu e-mail para reestablecer tu password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const ValidateTokenToChangePassword = async (req, res) => {
  const { token } = req.body;
  try {
    const isTokenexists = await Token.findOne({ token });
    if (!isTokenexists) {
      const error = new Error("Token no valido");
      return res.status(401).json({ message: error.message });
    }

    res.status(200).json({
      message: "Token valido, define tu nuevo password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const newPassword = async (req, res) => {
  const { token } = req.params;
  try {
    const isTokenexists = await Token.findOne({ token });
    if (!isTokenexists) {
      const error = new Error("Token no valido");
      return res.status(401).json({ message: error.message });
    }

    const user = await User.findById(isTokenexists.user);
    user.password = await hashPassword(req.body.password);
    await Promise.allSettled([user.save(), isTokenexists.deleteOne()]);
    res.status(200).json({
      message: "El Password se actualizo correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};
