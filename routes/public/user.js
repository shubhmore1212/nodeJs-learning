import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  modifyUser,
} from "../../controllers/user.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.post("/create-user", createUser);
router.put("/update-user", verifyToken, modifyUser);
router.delete("/delete-user", verifyToken, deleteUser);

export default router;
