import { connection } from "../config/database.js";

export const getUsers = async () => {
  try {
    const users = await connection.query("SELECT * FROM user");
    return users;
  } catch (error) {
    console.log("Error occured in user service in get users function", error)
    throw error
  }
};

export const createUser = async (name, role) => {
  const [result] = await connection.query(
    "INSERT INTO user (name,role) VALUES (?,?)",
    [name, role]
  );

  const id = result.insertId;
  return { id, name, role };
};
