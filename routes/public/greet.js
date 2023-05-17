import express from "express";
import { greet } from "../../controller/greet.js";

const router = express.Router();

router.get("/", greet);

export default router;
