import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  modifyUser,
} from "../../controller/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/create-user", createUser);
router.put("/update-user", modifyUser);
router.delete("/delete-user", deleteUser);

export default router;
