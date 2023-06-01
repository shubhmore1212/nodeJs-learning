import { getDBConnection } from "./db.js";

export const initDB = () => {
  return new Promise((resolve, reject) =>
    getDBConnection()
      .authenticate()
      .then(() => {
        resolve("Database connection has been established successfully");
      })
      .catch((error) => {
        reject(`Database connection: ${error}`);
      })
  );
};
