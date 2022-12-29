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
        .populate(["user", "category"]),
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

// create product
const createProducts = async (req = request, res = response) => {
  const { name, user, category, ...data } = req.body;

  const existProduct = await Product.findOne({ name });

  if (existProduct) {
    return res.status(400).json({
      success: false,
      msg: "The product already exist",
    });
  }

  const newProduct = {
    name,
    user: req.user._id,
    category,
    data,
  };

  try {
    const product = new Product(newProduct);
    await product.save();

    res.json({
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

module.exports = {
  getProducts,
  createProducts,
};
