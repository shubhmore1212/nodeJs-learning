import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { errorHandler } from "./errors/errorHandler.js";

import authRoutes from "./routes/public/auth.js";
import greetRoutes from "./routes/public/greet.js";
import userRoutes from "./routes/public/user.js";

// [TODO]:check this (not in top level?)
export const app = express();

//These IP's are not used at the moment
const WHITELIST = ["http://localhost:9000", "http://localhost:8000"];

//CORS not applicable right now
app.use(
  cors({
    origin: WHITELIST,
  })
);

app.use(bodyParser.json({ limit: "30mb", extended: true }));

//Routes
app.use("/auth", authRoutes);
app.use("/greet", greetRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);
