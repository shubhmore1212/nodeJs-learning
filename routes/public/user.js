import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  modifyUser,
} from "../../controllers/user.js";
import { validateParams } from "../../utils/validateParamMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/create-user", validateParams(["name", "role"], []), createUser);
router.put(
  "/update-user",
  validateParams(["id", "name", "role"], []),
  modifyUser
);
router.delete("/delete-user", validateParams([], ["id"]), deleteUser);

export default router;
