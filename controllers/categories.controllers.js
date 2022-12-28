const { request, response } = require("express");
const { Categories } = require("../models");

// get categories
const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const queryCategory = { status: true };

  try {
    const [categories, total] = await Promise.all([
      Categories.find(queryCategory).skip(Number(from)).limit(Number(limit)),
      Categories.countDocuments(queryCategory),
    ]);

    res.json({
      success: true,
      total,
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return json.status(500).json({
      success: false,
      msg: "the operation cannot completed - check log",
    });
  }
};

// get category by id
const getCategoriesById = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Categories.findById(id);

  res.json({
    success: true,
    data: category,
  });
};

// create category
const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Categories.findOne({ name });

  // if exist category
  if (categoryDB) {
    return res.status(400).json({
      success: false,
      msg: `The category ${categoryDB.name} already exist`,
    });
  }

  // generate data to save
  const categoryData = {
    name,
    user: req.user.uid,
  };

  try {
    const category = new Categories(categoryData);

    await category.save();

    res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      msg: "Error to created category",
    });
  }
};

// update category

// delete category - change status to false

module.exports = {
  createCategory,
  getCategories,
  getCategoriesById,
};
