// TODO: configure eslint, use eslint for import order
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import greetRoutes from "./routes/public/greet.js";
import userRoutes from "./routes/public/user.js";

dotenv.config();
const app = express();

app.use(cors());

// Taking arguments from command line
const args = process.argv.splice(2);

const PORT = args[0]?.split("=")[1] || process.env.PORT || 8000;

//Routes
// TODO: move this to index file
app.use("/greet", greetRoutes);
app.use("/user", userRoutes);

// initialize db connection

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
