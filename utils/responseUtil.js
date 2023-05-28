export const response = (res, statusCode, message) => {
  return res.status(statusCode).json(message);
};
