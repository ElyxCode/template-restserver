const { request, response } = require("express");
const { Product } = require("../models");

// get products
const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  try {
    const [products, total] = await Promise.all([
      Product.find(query)
        .skip(from)
        .limit(limit)
        .populate("user", "name")
        .populate("category", "name"),
      Product.countDocuments(query),
    ]);

    res.json({
      success: true,
      total,
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "The process is not completed - check log",
    });
  }
};

// get products by id
const getProductsById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate("user", "name")
      .populate("category", "name");

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "The operation is not completed - check log",
    });
  }
};

// create product
const createProducts = async (req = request, res = response) => {
  const { status, user, ...data } = req.body;

  const existProduct = await Product.findOne({ name: data.name });

  if (existProduct) {
    return res.status(400).json({
      success: false,
      msg: `The product ${existProduct.name} already exist`,
    });
  }

  const newProduct = {
    ...data,
    name: data.name.toUpperCase(),
    user: req.user._id,
  };

  try {
    const product = new Product(newProduct);
    await product.save();

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      msg: "Error to created product",
    });
  }
};

// update product
const updateProducts = async (req = request, res = response) => {
  const { id } = req.params;

  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    }).populate(["user", "category"]);

    res.json({
      success: true,
      data: updateProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "The process was not completed - check log",
    });
  }
};

// delete product
const deleteProducts = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // const deleteProduct = await Product.findByIdAndDelete(id);
    const deleteProduct = await Product.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );

    res.json({
      success: true,
      msg: "The product was deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "The process was not completed - check log",
    });
  }
};

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};
