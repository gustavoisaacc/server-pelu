import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

connectDB();
dotenv.config();

export const app = express();
