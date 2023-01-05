const { response, request } = require("express");
const { isValidObjectId } = require("mongoose");
const { User, Categories, Product } = require("../models");

const allowedCollections = ["users", "categories", "products", "roles"];

// search by collection and term
const searchTerm = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      success: false,
      msg: `The allowed collections are ${allowedCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUser(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    default:
      res.status.json({
        success: false,
        msg: "The search could not be performed",
      });
  }
};

// search user
const searchUser = async (term = "", res = response) => {
  const searchRegExp = new RegExp(term, "i");
  // if mongoid in term, search by id or name
  const user = isMongoId(term)
    ? await User.findById(term)
    : await User.find({
        $or: [{ name: searchRegExp }, { email: searchRegExp }],
        $and: [{ status: true }],
      });

  if (!user) {
    return res.status(400).json({
      success: false,
      msg: `The user ${term} no exist`,
    });
  }

  res.json({
    success: true,
    data: user,
  });
};

// search categories
const searchCategories = async (term = "", res = response) => {
  const searchRegExp = new RegExp(term, "i");

  const category = isMongoId(term)
    ? await Categories.findById(term)
    : await Categories.find({
        name: searchRegExp,
        status: true,
      });

  if (!category) {
    return res.status(400).json({
      success: false,
      msg: `The category ${term} no exist`,
    });
  }

  res.json({
    success: true,
    data: category,
  });
};

// seach products
const searchProducts = async (term = "", res = response) => {
  const searchRegExp = new RegExp(term, "i");

  const product = isMongoId(term)
    ? await Product.findById(term).populate("category", "name")
    : await Product.find({
        name: searchRegExp,
        status: true,
      }).populate("category", "name");

  if (!product) {
    return res.status(400).json({
      success: false,
      msg: `The product ${term} no exist`,
    });
  }

  res.json({
    success: true,
    data: product,
  });
};

const isMongoId = (term = "") => {
  return isValidObjectId(term);
};

module.exports = {
  searchTerm,
};
