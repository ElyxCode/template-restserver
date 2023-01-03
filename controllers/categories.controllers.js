const { request, response } = require("express");
const { Categories } = require("../models");

// get categories
const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const queryCategory = { status: true };

  try {
    const [categories, total] = await Promise.all([
      Categories.find(queryCategory)
        .skip(Number(from))
        .limit(Number(limit))
        .populate("user", "name"),
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

  const category = await Categories.findById(id).populate("user", "name");

  res.json({
    success: true,
    data: category,
  });
};

// create category
const createCategories = async (req = request, res = response) => {
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
    user: req.user._id,
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
const updateCategories = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;
  // const newCategoryName = req.body.name.toUpperCase();

  try {
    const category = await Categories.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "The operation was not completed - check log",
    });
  }
};

// delete category - change status to false
const deleteCategories = async (req = request, res = response) => {
  const { id } = req.params;

  // delete category from db
  //const category = await Categories.findByIdAndDelete(id);

  try {
    // update status category to false (disable)
    const category = await Categories.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.json({
      success: true,
      msg: "The category was deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "The operation was not completed - check log",
    });
  }
};

module.exports = {
  createCategories,
  getCategories,
  getCategoriesById,
  updateCategories,
  deleteCategories,
};
