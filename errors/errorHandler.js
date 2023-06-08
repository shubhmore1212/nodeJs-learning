import { response } from "../utils/responseUtil.js";

export const errorHandler = (error, req, res, next) => {
  console.log("Error", error);
  if (error.name === "ValidationError") {
    return response(res, 422, {
      type: "Validation Error",
      details: error.details,
    });
  }
  if (error instanceof Error) {
    return response(res, error.statusCode, error.message);
  }
  return response(res, 500, error.message);
};
