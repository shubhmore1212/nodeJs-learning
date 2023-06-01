export const errorHandler = (error, req, res, next) => {
  if (error instanceof Error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  return res.status(500).json({ error: error.message });
};
