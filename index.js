import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { errorHandler } from "./errors/errorHandler.js";
import { initDB } from "./utils/dbInitialize.js";

import authRoutes from "./routes/public/auth.js";
import greetRoutes from "./routes/public/greet.js";
import userRoutes from "./routes/public/user.js";

// [TODO]:check this (not in top level?)
dotenv.config();
const app = express();

//These IP's are not used at the moment
const WHITELIST = ["http://localhost:9000", "http://localhost:8000"];

//CORS not applicable right now
app.use(
  cors({
    origin: WHITELIST,
  })
);

app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Taking arguments from command line
const args = process.argv.splice(2);

const PORT = args[0]?.split("=")[1] || process.env.PORT || 8000;

//Routes
app.use("/auth", authRoutes);
app.use("/greet", greetRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

initDB()
  .then((res) => {
    console.log(res);
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((error) => console.log(`Database connection: ${error}`));
