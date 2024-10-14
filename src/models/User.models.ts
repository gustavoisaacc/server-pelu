import mongoose, { Schema, Document } from "mongoose";

const st;

export type UserType = Document & {
  name: string;
  lastName: string;
  phone: string;
  direction: string;
  email: string;
  password: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  service: string;
};

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    direction: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    roles: { type: [String], default: ["user"] },
    service: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType>("User", userSchema);
export default User;
