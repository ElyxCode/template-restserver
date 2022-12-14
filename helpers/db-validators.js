const { Categories, Product } = require("../models");
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
    throw new Error(`The id ${id} does not exist`);
  }

  // if user exist but your status is false (user disabled)
  if (existUser.status === false) {
    throw new Error("The user is already deleted");
  }
};

const existCategories = async (id) => {
  const existCategory = await Categories.findById(id);

  if (!existCategory) {
    throw new Error(`The category ${id} does not exist`);
  }

  // if category exist but your status is false (category disabled)
  if (existCategory.status === false) {
    throw new Error("The category is already deleted");
  }
};

const existProducts = async (id) => {
  const existProduct = await Product.findById(id);

  if (!existProduct) {
    throw new Error(`The product ${id} does not exist`);
  }

  // if category exist but your status is false (category disabled)
  if (existProduct.status === false) {
    throw new Error("The product is already deleted");
  }
};

// const existCategoriesByName = async (name = "") => {
//   const existCategory = await Categories.findOne(name.toUpperCase());

//   if (!existCategory) {
//     throw new Error(`The category ${name.toUpperCase()} does not exist`);
//   }

//   // if category exist but your status is false (category disabled)
//   if (existCategory.status === false) {
//     throw new Error("The category is not available");
//   }
// };

module.exports = {
  isValidRole,
  existEmail,
  existUserById,
  existCategories,
  existProducts,
  // existCategoriesByName,
};
