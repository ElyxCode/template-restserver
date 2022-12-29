const { request, response } = require("express");
const { Product } = require("../models");

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
  createProducts,
};
