import express from "express";

import { createUser, getAllUsers } from "../../controller/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/create-user", createUser);

export default router;
