import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import AppError from "../errors/appError.js";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new AppError("User does not exist", 400);

  const isMatch = await bcrypt.compare(password, user.dataValues.password);
  if (!isMatch) throw new AppError("Invalid Credentials", 400);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  delete user.dataValues["password"];

  return { token, user };
};
