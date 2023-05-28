import { User } from "../model/user.js";
import { response } from "../utils/responseUtil.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    response(res, 200, { data: user });
  } catch (error) {
    response(res, 404, { error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, role } = req.body;
    const result = await User.create({
      name,
      role,
    });
    response(res, 200, { data: result });
  } catch (error) {
    response(res, 400, { error: error.message });
  }
};
