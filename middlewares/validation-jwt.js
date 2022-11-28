const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // extract token from header.

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No token in the request",
    });
  }

  try {
    // ckeck if token is valid
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    //req.uid = uid; // extract uid from token payload and add like attribute of request;
    const userAuthenticated = await User.findById(uid);

    // check if user no exist in db
    if (!userAuthenticated) {
      return res.status(401).json({
        success: false,
        msg: "No valid token -  user uid no exist in db",
      });
    }

    // check if user is not disabled
    if (!userAuthenticated.status) {
      return res.status(401).json({
        success: false,
        msg: "No valid token - user is disabled",
      });
    }

    req.user = userAuthenticated;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      success: false,
      msg: "No valid token",
    });
  }
};

module.exports = {
  validJWT,
};
