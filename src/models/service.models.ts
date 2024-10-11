import mongoose, { Document, Schema } from "mongoose";

export type serviceType = Document & {
  name: string;
  description: string;
  duration: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

const serviceSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Service = mongoose.model<serviceType>("Service", serviceSchema);
