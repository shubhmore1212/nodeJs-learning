import express from "express";
import { greet } from "../../controllers/greet.js";

const router = express.Router();

router.get("/", greet);

export default router;
