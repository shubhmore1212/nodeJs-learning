import express from "express";

import { login } from "../../controllers/auth.js";
import { validateParams } from "../../middleware/validateParam.js";

const router = express.Router();

router.post("/login", validateParams(["email", "password"], []), login);

export default router;
