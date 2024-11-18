import mongoose from "mongoose";
import { sendConfirmationEmails } from "../config/email";
import { Appointment } from "../models/Appointment.models";
import Detail from "../models/Detail";
import User from "../models/User.models";

export const createReservation = async (req, res) => {
  const { userId, selectedServices, data } = req.body;
  const selectedService = selectedServices[0];
  console.log("🚀 ~ createReservation ~ req.body:", req.body);

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.json({ message: "Usuario no valido" });
    }
    const appoitment = await Appointment.findById(selectedService.citaId);
    console.log("🚀 ~ createReservation ~ appoitment:", appoitment);
    console.log("🚀 ~ createReservation ~ appoitment:", selectedService.citaId);
    if (!appoitment) {
      res.json({ message: "Turno no valido" });
    }
    const newReservation = new Detail({
      serviceId: selectedService.serviceId,
      name: selectedService.name,
      price: selectedService.price,
      duration: selectedService.duration,
      citaId: selectedService.citaId,
      date: selectedService.date,
      startTime: selectedService.startTime,
      delay: selectedService.delay,
    });
    console.log("🚀 ~ createReservation ~ newReservation:", newReservation);

    await Promise.allSettled([newReservation.save()]);

    // Llamar a la función para enviar los correos
    sendConfirmationEmails(
      data.clientEmail,
      user.email,
      data.phone,
      newReservation
    );

    res.status(201).json({ message: "El turno se confirmo correctamente" });
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
    res.status(500).json({ message: "Error al guardar la reserva" });
  }
};
