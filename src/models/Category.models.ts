import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { serviceType } from "./service.models";

export interface Icategories extends Document {
  name: string;
  services: PopulatedDoc<serviceType & Document>[];
}

const categoriesSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  },
  {
    timestamps: true,
  }
);

export const Categories = mongoose.model<Icategories>(
  "Categories",
  categoriesSchema
);
