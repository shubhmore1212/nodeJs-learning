import { tryCatch } from "../errors/exceptionHandler.js";
import { response } from "../utils/responseUtil.js";

export const greet = tryCatch((req, res) => {
  return response(res, 200, "Hello World");
});
