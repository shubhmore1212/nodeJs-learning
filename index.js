import express from "express";
import dotenv from "dotenv";
import greetRoutes from "./routes/public/greet.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

//Routes
app.use("/greet", greetRoutes);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
