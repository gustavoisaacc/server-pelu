import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { UserType } from "./User.models";

export type AvatarType = Document & {
  url: string;
  user: PopulatedDoc<UserType>;
};

const avatarSchema: Schema = new Schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Avatar = mongoose.model<AvatarType>("Avatar", avatarSchema);
