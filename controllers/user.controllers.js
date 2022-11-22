// intelisense help with express request and response
const { response, request } = require("express");

const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUsers = (req = request, res = response) => {
  res.json({
    sucess: true,
    msg: "api get",
  });
};

const getUserById = (req = request, res = response) => {
  res.json({
    sucess: true,
    msg: "api get only user",
  });
};

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  // encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // save db
  await user.save();
  res.json({
    sucess: true,
    data: user,
  });
};

const updateUser = (req = request, res = response) => {
  res.json({
    sucess: true,
    msg: "api put",
  });
};

const deleteUser = (req = request, res = response) => {
  res.json({
    sucess: true,
    msg: "api delete",
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
