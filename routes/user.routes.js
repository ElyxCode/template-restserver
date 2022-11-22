const { Router } = require("express");
const { check } = require("express-validator");
const Role = require("../models/role");

const { validationFields } = require("../middlewares/validation-fields");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");

const router = Router();

router.get("/", getUsers);

router.get("/", getUserById);

router.post(
  "/",
  [
    check("email", "The email is not valid").isEmail(),
    check("password", "The password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("name", "The name is required").not().isEmpty(),
    // custom validation if role exist in the database.
    check("role").custom(async (role = "") => {
      const existRole = await Role.findOne({ role });
      if (!existRole) {
        throw new Error(`The role ${role} is not registered in the database.`);
      }
    }),
    validationFields,
  ],
  createUser
);

router.put("/:id", updateUser);

router.delete("/", deleteUser);

module.exports = router;
