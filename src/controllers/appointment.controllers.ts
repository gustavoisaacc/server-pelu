import { Appointment } from "../models/Appointment.models";
import { Categories } from "../models/Category.models";
export const create = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;
  try {
    const { date, startTime, delay } = data;
    const appointmentDate = new Date(date + "T00:00:00");
    const appointmentTime = await Appointment.findOne({ startTime });
    if (appointmentTime) {
      return res.status(500).json({
        message:
          "La hora seleccionada ya está ocupada. Por favor, elija otra hora.",
      });
    }
    const appointment = new Appointment({
      date: appointmentDate,
      startTime,
      delay,
      manager: userId,
    });
    console.log("🚀 ~ create ~ appointment:", appointment);
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
            $in: req.user.id,
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
  const [year, month, day] = data.date.split("-").map(Number);
  const appointmentDate = new Date(Date.UTC(year, month - 1, day));
  console.log("🚀 ~ updateAppointment ~ appointmentDate:", appointmentDate);

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Turno de cita no encontrado" });
    }
    appointment.date = appointmentDate;
    appointment.startTime = data.startTime;
    appointment.delay = data.delay;
    await appointment.save();
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

export const getCategoriesInAppoitment = async (req, res) => {
  try {
    const categories = await Categories.find({
      manager: req.params.id,
    }).populate("services");
    if (!categories) {
      return res.status(404).json({ message: "categorias no encontradas" });
    }
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el turno de cita" });
  }
};
