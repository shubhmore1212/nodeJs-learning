import { tryCatch } from "../errors/exceptionHandler.js";
import { loginUser } from "../services/auth.js";
import { response } from "../utils/responseUtil.js";

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser({ email, password });

  return response(res, 200, result);
});
