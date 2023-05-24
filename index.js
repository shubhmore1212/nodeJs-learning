import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import greetRoutes from "./routes/public/greet.js";
import userRoutes from "./routes/public/user.js";

dotenv.config();
const app = express();

app.use(cors());

// Taking arguments from command line
const args = process.argv.splice(2);

const PORT = args[0]?.split("=")[1] || process.env.PORT || 8000;

//Routes
app.use("/greet", greetRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
