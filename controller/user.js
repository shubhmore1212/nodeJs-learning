import { getUsers } from "../services/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await getUsers();
    res.status(200).json({ data: user[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
