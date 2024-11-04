import mongoose, { Document, Schema, PopulatedDoc, Types } from "mongoose";
import { serviceType } from "./service.models";
import { UserType } from "./User.models";

export interface Icategories extends Document {
  name: string;
  services: PopulatedDoc<serviceType & Document>[];
  manager: PopulatedDoc<UserType>;
}

const categoriesSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    manager: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Categories = mongoose.model<Icategories>(
  "Categories",
  categoriesSchema
);
