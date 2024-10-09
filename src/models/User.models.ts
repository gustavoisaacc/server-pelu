import mongoose, { Schema, Document } from "mongoose";

export type UserType = Document & {
  nombre: string;
  apellido: string;
  telefone: string;
  direccion: string;
  email: string;
  password: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  servicio: string;
};

const userSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: { type: String, required: true, trim: true },
  telefono: { type: String, required: true, trim: true },
  direccion: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  roles: { type: [String], default: ["user"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  servicio: { type: String, trim: true },
});

const User = mongoose.model<UserType>("User", userSchema);
export default User;
