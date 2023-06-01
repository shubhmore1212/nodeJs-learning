import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const getDBConnection = () => {
  const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, DB_DIALECT } =
    process.env;

  try {
    return new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
      host: MYSQL_HOST,
      dialect: DB_DIALECT,
    });
  } catch (error) {
    console.log(`DB Connection ${error}`);
  }
};
