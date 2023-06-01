import AppError from "../AppError.js";
import { User } from "../model/user.js";

export const getUsers = async () => {
  return await User.findAll();
};

export const addUser = async (payload) => {
  const { name, role } = payload;

  if (!name || !role) {
    throw new AppError("Please send the valid details", 400);
  }

  const result = await User.create({
    name,
    role,
  });
  return {
    id: result.dataValues.id,
    name,
    role,
  };
};

export const updateUser = async (payload) => {
  const { name, role, id } = payload;
  const result = await User.update(
    {
      name,
      role,
    },
    {
      where: {
        id,
      },
    }
  );
  return result[0] === 1
    ? "User Updated Successfully"
    : "No User found of given Id";
};

export const removeUser = async (payload) => {
  const result = await User.destroy({
    where: {
      id: payload.id,
    },
  });
  return result === 1 ? "User Deleted Successfully" : "User doesn't exist";
};
