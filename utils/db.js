import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_DIALECT,
} = process.env;

export const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: MYSQL_DIALECT,
  }
);
