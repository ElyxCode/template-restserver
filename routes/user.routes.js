const { Router } = require("express");
const { check } = require("express-validator");

const { validationFields } = require("../middlewares/validation-fields");
const { isValidRole, existEmail } = require("../helpers/db-validators");
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
    // custom validation: check if email exist
    check("email").custom(existEmail),
    check("password", "The password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("name", "The name is required").not().isEmpty(),
    // custom validation: check if role exist in the database.
    check("role").custom(isValidRole),
    validationFields,
  ],
  createUser
);

router.put("/:id", updateUser);

router.delete("/", deleteUser);

module.exports = router;
