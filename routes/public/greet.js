import express from "express";
import { greet } from "../../controller/greetController.js";

const router = express.Router();

router.get("/", greet);

export default router;
