import AppError from "../AppError.js";
import { addUser, getUsers, removeUser, updateUser } from "../services/user.js";
import { response } from "../utils/responseUtil.js";
import { tryCatch } from "../utils/tryCatch.js";

export const getAllUsers = tryCatch(async (req, res) => {
  const user = await getUsers();
  if (!user) {
    throw new AppError("Users not found", 404);
  }
  return response(res, 200, user);
});

export const createUser = tryCatch(async (req, res) => {
  const result = await addUser(req.body);
  return response(res, 200, result);
});

export const modifyUser = tryCatch(async (req, res) => {
  const result = await updateUser(req.body);
  return response(res, 200, result);
});

export const deleteUser = tryCatch(async (req, res) => {
  const result = await removeUser(req.query);
  return response(res, 200, result);
});
