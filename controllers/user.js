import AppError from "../errors/appError.js";
import { addUser, getUsers, removeUser, updateUser } from "../services/user.js";
import { response } from "../utils/responseUtil.js";
import { tryCatch } from "../errors/exceptionHandler.js";

export const getAllUsers = tryCatch(async (req, res) => {
  const user = await getUsers();
  if (!user) {
    throw new AppError("Users not found", 404);
  }
  return response(res, 200, user);
});

export const createUser = tryCatch(async (req, res) => {
  const { name, role } = req.body;
  const result = await addUser({ name, role });
  return response(res, 200, result);
});

export const modifyUser = tryCatch(async (req, res) => {
  const { name, role, id } = req.body;
  const result = await updateUser({ name, role, id });
  return response(res, 200, result);
});

export const deleteUser = tryCatch(async (req, res) => {
  const result = await removeUser(req.query);
  return response(res, 200, result);
});
