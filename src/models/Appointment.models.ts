import mongoose, { Document, Schema, PopulatedDoc, Types } from "mongoose";
import { UserType } from "./User.models";

export type AppointmentType = Document & {
  date: Date;
  startTime: Date;
  delay: number;
  state: boolean;
  manager: PopulatedDoc<UserType>;
};

const AppointmentSchema = new Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    delay: { type: Number, required: true },
    state: { type: Boolean, required: true, default: false },
    manager: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model<AppointmentType>(
  "Appointment",
  AppointmentSchema
);
