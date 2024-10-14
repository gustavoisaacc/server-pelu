import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { serviceType } from "./service.models";

export type categoriesType = Document & {
  name: string;
  services: PopulatedDoc<serviceType & Document>[];
};

const categoriesSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  },
  {
    timestamps: true,
  }
);

export const Categories = mongoose.model<categoriesType>(
  "Categories",
  categoriesSchema
);
