import mongoose, { Schema, Document } from "mongoose";

const ROLES = {
  ADMIN: "admin",
  USER: "user",
  CUSTOMER: "customer",
} as const;

export type UserType = Document & {
  name: string;
  lastName: string;
  phone: string;
  direction: string;
  email: string;
  confirm: boolean;
  password: string;
  roles: string[];
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
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
    password: { type: String, required: true, trim: true },
    roles: { type: [String], default: [ROLES.USER] },
    service: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType>("User", userSchema);
export default User;
