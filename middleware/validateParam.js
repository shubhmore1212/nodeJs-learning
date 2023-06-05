import AppError from "../errors/appError.js";

export const validateParams =
  (requiredBody, requiredParams) => (req, res, next) => {
    const bodyParams = checkParams(req.body, requiredBody);
    const paramsQuery = checkParams(req.query, requiredParams);

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

const checkParams = (request, requiredParameters) => {
  const parameters = [];

  requiredParameters.forEach((param) => {
    if (!request[param]) {
      parameters.push(param);
    }
  });

  return parameters;
};
