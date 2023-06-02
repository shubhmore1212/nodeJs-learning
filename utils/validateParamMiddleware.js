import AppError from "../errors/appError.js";

export const validateParams =
  (requiredBody, requiredParams) => (req, res, next) => {
    const bodyParams = [];
    const paramsQuery = [];

    requiredBody.forEach((param) => {
      if (!req?.body[param]) {
        bodyParams.push(param);
      }
    });

    requiredParams.forEach((param) => {
      if (!req?.query[param]) {
        paramsQuery.push(param);
      }
    });

    if (bodyParams.length > 0 || paramsQuery.length > 0) {
      throw new AppError(
        `Missing required parameter(s): ${bodyParams.join(
          ", "
        )} ${paramsQuery.join(", ")}`,
        422
      );
    }

    next();
  };
