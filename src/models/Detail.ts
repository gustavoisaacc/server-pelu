import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { UserType } from "./User.models";

export type DetailType = Document & {
  serviceid: string;
  name: string;
  price: number;
  date: Date;
  duration: string;
  citaId: string;
  startTime: string;
  delay: string;
  userId: PopulatedDoc<UserType>;
};

const detailSchema: Schema = new Schema({
  serviceId: {
    type: String,
    trim: true,
    require: true,
  },
  name: {
    type: String,
    trim: true,
    require: true,
  },
  price: {
    type: Number,
    trim: true,
    require: true,
  },
  date: {
    type: Date,
    trim: true,
    require: true,
  },
  duration: {
    type: String,
    trim: true,
    require: true,
  },
  citaId: {
    type: String,
    trim: true,
    require: true,
  },
  startTime: {
    type: String,
    trim: true,
    require: true,
  },
  delay: {
    type: String,
    trim: true,
    require: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
});
const Detail = mongoose.model<DetailType>("Detail", detailSchema);

export default Detail;
