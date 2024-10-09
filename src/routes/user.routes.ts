import express from "express";

const routeUser = express.Router();

routeUser.get("/", getUser);
