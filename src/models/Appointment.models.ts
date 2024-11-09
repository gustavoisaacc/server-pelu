import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";

export type AppointmentType = Document & {
  date: Date;
  startTime: Date;
  delay: number;
  state: boolean;
};

const AppointmentSchema = new Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    delay: { type: Number, required: true },
    state: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model<AppointmentType>(
  "Appointment",
  AppointmentSchema
);
