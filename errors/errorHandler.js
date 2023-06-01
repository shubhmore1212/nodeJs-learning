import { response } from "../utils/responseUtil.js";

export const errorHandler = (error, req, res, next) => {
  if (error instanceof Error) {
    return response(res, error.statusCode, error.message);
  }
  return response(res, 500, error.message);
};
