const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The role ${role} is not registered in the database.`);
  }
};

const existEmail = async (email = "") => {
  const hasEmail = await User.findOne({ email });
  if (hasEmail) {
    throw new Error(`The email is already registered`);
  }
};

const existUserById = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`the id ${id} does not exist`);
  }
};

module.exports = {
  isValidRole,
  existEmail,
  existUserById,
};
