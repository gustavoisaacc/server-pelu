import mongoose, { Document, Schema, Types } from "mongoose";

export type serviceType = Document & {
  name: string;
  description: string;
  duration: number;
  price: number;
  discount: number;
  isPopular: boolean;
  category: Types.ObjectId;
  state: boolean;
};

const serviceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    discount: { type: Number, trim: true, default: 0 },
    isPopular: { type: Boolean, trim: true, default: false },
    state: { type: Boolean, trim: true, default: false },
    category: { type: Types.ObjectId, ref: "Categories" },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<serviceType>("Service", serviceSchema);
