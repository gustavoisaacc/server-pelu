import { Appointment } from "../models/Appointment.models";
export const create = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;

  // Verificar si 'data' está definido
  if (!data) {
    return res.status(400).json({
      message: "El cuerpo de la solicitud es inválido. Se requiere 'data'.",
    });
  }

  try {
    const { date, startTime, delay } = data;

    // Guardar la fecha directamente
    const appointmentDate = new Date(date); // date se guardará como un objeto Date

    // Guardar startTime como un número (hora en formato 24)
    const appointmentStartTime = startTime; // Puedes guardarlo como cadena "10:00" o como un número 10, según lo que necesites

    const appointment = new Appointment({
      date: appointmentDate, // Se guarda como un objeto Date
      startTime: appointmentStartTime, // Se guarda como una cadena o número
      delay,
    });

    await appointment.save();

    res.status(201).json({ message: "Turno de cita creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el turno de cita" });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [
        {
          manager: {
            $in: req.user._id,
          },
        },
      ],
    });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los turnos de cita" });
  }
};

export const getAppointmentsById = async (req, res) => {
  const id = req.params.id;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Turno de cita no encontrado" });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el turno de cita" });
  }
};

export const updateAppointment = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!appointment) {
      return res.status(404).json({ message: "Turno de cita no encontrado" });
    }
    res.json({ message: "Turno fue actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el turno de cita" });
  }
};

export const deleteAppointment = async (req, res) => {
  const id = req.params.id;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Turno de cita no encontrado" });
    }
    res.json({ message: "Turno fue eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el turno de cita" });
  }
};
