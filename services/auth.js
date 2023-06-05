import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ msg: "User does not exist" });

  const isMatch = await bcrypt.compare(password, user.dataValues.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  delete user.dataValues["password"];

  return { token, user };
};
