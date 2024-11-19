import mongoose from "mongoose";
import { sendConfirmationEmails } from "../config/email";
import { Appointment } from "../models/Appointment.models";
import Detail from "../models/Detail";
import User from "../models/User.models";

export const createReservation = async (req, res) => {
  const { userId, selectedServices, data } = req.body;
  const selectedService = selectedServices[0];

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.json({ message: "Usuario no valido" });
    }
    const appoitment = await Appointment.findById(selectedService.citaId);
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
      userId,
    });
    appoitment.state = true;

    await Promise.allSettled([newReservation.save(), appoitment.save()]);

    // Llamar a la función para enviar los correos
    sendConfirmationEmails(
      data.customerEmail,
      user.email,
      data.customerPhone,
      selectedService
    );

    res.status(201).json({ message: "El turno se confirmo correctamente" });
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
    res.status(500).json({ message: "Error al guardar la reserva" });
  }
};

export const getDetailAppointmentFromClient = async (req, res) => {
  try {
    const detail = await Detail.find({ userId: req.user._id });
    res.json(detail);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reserva" });
  }
};
