import { connection } from "../config/database.js";

export const getUsers = async () => {
  const users = await connection.query("SELECT * FROM user");
  return users;
};

export const createUser = async (name, role) => {
  const [result] = await connection.query(
    "INSERT INTO user (name,role) VALUES (?,?)",
    [name, role]
  );

  const id = result.insertId;
  return { id, name, role };
};
