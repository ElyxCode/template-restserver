const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");

const User = require("../models/user");

const authLogin = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // check if email exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "The email / password is not correct - email",
      });
    }

    // check if user is active
    if (!user.status) {
      return res.status(400).json({
        success: false,
        msg: "The email / password is not correct - status false",
      });
    }

    // check the password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        msg: "The email / password is not correct - password",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status().json({
      success: false,
      msg: "an error occurred, please contact the administrator",
    });
  }
};

module.exports = {
  authLogin,
};
