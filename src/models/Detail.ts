import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";

export type DetailType = Document & {
  serviceid: string;
  name: string;
  price: number;
  duration: string;
  citaId: string;
  date: string;
  startTime: string;
  delay: string;
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
});
const Detail = mongoose.model<DetailType>("Detail", detailSchema);

export default Detail;
