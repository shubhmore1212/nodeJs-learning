import { User } from "../models/user.js";

export const getUsers = async () => {
  return await User.findAll();
};

export const addUser = async (payload) => {
  const result = await User.create({
    ...payload,
    password: payload.passwordHash,
  });

  return {
    id: result.dataValues.id,
    ...payload,
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
