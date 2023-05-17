import express from "express";
import greetRoutes from "./routes/public/greet.js";

const PORT = 8000;
const app = express();

//ROUTES
app.use("/greet", greetRoutes);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
