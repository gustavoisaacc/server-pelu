import mongoose, { Document, Schema, Types } from "mongoose";

export type TokenType = Document & {
  token: string;
  user: string;
  createdAt: Date;
};

const tokenSchema: Schema = new Schema({
  token: {
    type: String,
    require: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: "1m",
  },
});

export const Token = mongoose.model<TokenType>("Token", tokenSchema);
