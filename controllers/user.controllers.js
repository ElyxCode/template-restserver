// intelisense help with express request and response
const { response, request } = require("express");

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

const createUser = (req = request, res = response) => {
  res.json({
    sucess: true,
    msg: "api post",
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
