// intelisense help with express request and response options
const { response, request } = require("express");

const bcryptjs = require("bcryptjs");

const User = require("../models/user");

// get users
const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  // const users = await User.find(query).skip(Number(from)).limit(Number(limit));
  // const total = await User.countDocuments(query);

  const [users, total] = await Promise.all([
    User.find(query).skip(Number(from)).limit(Number(limit)),
    User.countDocuments(query),
  ]);

  res.json({
    sucess: true,
    total,
    data: users,
  });
};

// get user by id
const getUserById = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json({
    sucess: true,
    data: user,
  });
};

// create user
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

// update user
const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(
    id,
    rest,
    { new: true } // return data update
  );

  res.json({
    sucess: true,
    data: user,
  });
};

// delete user
const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  // delete database
  //const user = await User.findByIdAndDelete(id);

  // update data, no show in get (user disabled)
  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true } // return data updated
  );

  res.json({
    sucess: true,
    msg: "user disabled",
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
