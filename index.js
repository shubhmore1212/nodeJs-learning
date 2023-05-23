import express from "express";
import dotenv from "dotenv";
import greetRoutes from "./routes/public/greet.js";

dotenv.config();
const app = express();

// Taking arguments from command line
const args = process.argv.splice(2);

const PORT = args[0]?.split("=")[1] || process.env.PORT || 8000;

//Routes
app.use("/greet", greetRoutes);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
