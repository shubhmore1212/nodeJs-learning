import AppError from "../errors/appError.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      throw new AppError("Access Denied", 403);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(400).json({ error: "Invalid Token" });

    res.status(500).json({ error: error.message });
  }
};
