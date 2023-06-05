import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  modifyUser,
} from "../../controllers/user.js";
import { validateParams } from "../../middleware/validateParam.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.post(
  "/create-user",
  validateParams(["name", "role", "email", "password"], []),
  createUser
);
router.put(
  "/update-user",
  verifyToken,
  validateParams(["id", "name", "role"], []),
  modifyUser
);
router.delete(
  "/delete-user",
  verifyToken,
  validateParams([], ["id"]),
  deleteUser
);

export default router;
