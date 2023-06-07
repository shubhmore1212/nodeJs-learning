import bcrypt from "bcrypt";
import Joi from "joi";

import AppError from "../errors/appError.js";
import { addUser, getUsers, removeUser, updateUser } from "../services/user.js";
import { response } from "../utils/responseUtil.js";
import {
  checkForError,
  registerUserSchema,
  updateUserSchema,
} from "../middleware/validateParam.js";
import { tryCatch } from "../errors/exceptionHandler.js";

export const getAllUsers = tryCatch(async (req, res) => {
  const user = await getUsers();
  if (!user) {
    throw new AppError("Users not found", 404);
  }
  return response(res, 200, user);
});

export const createUser = tryCatch(async (req, res) => {
  const { name, role, email, password } = req.body;

  const { error } = registerUserSchema.validate(
    {
      name,
      role,
      email,
      password,
    },
    {
      abortEarly: false,
    }
  );

  checkForError(error);

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const result = await addUser({ name, role, email, passwordHash });
  delete result["passwordHash"];

  return response(res, 200, result);
});

export const modifyUser = tryCatch(async (req, res) => {
  const { name, role, email, password, id } = req.body;

  const { error } = updateUserSchema.validate({
    name,
    role,
    email,
    password,
    id,
  });

  checkForError(error);

  const result = await updateUser({ name, role, email, password, id });
  return response(res, 200, result);
});

export const deleteUser = tryCatch(async (req, res) => {
  const { error } = Joi.object({ id: Joi.number().required() }).validate(
    req.query
  );

  checkForError(error);

  const result = await removeUser(req.query);
  return response(res, 200, result);
});
