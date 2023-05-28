import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import greetRoutes from "./routes/public/greet.js";
import userRoutes from "./routes/public/user.js";
import { sequelize } from "./utils/db.js";

dotenv.config();
const app = express();

const WHITELIST = ["http://localhost:9000", "http://localhost:8000"];

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
app.use("/greet", greetRoutes);
app.use("/user", userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully");
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database connection: ${error}`);
  });
