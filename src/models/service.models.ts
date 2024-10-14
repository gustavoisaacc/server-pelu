import mongoose, { Document, Schema, Types } from "mongoose";

export type serviceType = Document & {
  name: string;
  description: string;
  duration: number;
  price: number;
  discount: number;
  isPopular: boolean;
  category: Types.ObjectId;
};

const serviceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    discount: { type: Number, required: true, trim: true, default: 0 },
    isPopular: { type: Boolean, required: true, trim: true, default: false },
    category: { type: Types.ObjectId, ref: "Categories" },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<serviceType>("Service", serviceSchema);
