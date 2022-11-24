const { Router } = require("express");
const { check } = require("express-validator");

const { validationFields } = require("../middlewares/validation-fields");
const {
  isValidRole,
  existEmail,
  existUserById,
} = require("../helpers/db-validators");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");

const router = Router();

// get users
router.get("/", getUsers);

// get user by id
router.get(
  "/:id",
  [
    check("id", "Not valid id").isMongoId(),
    check("id").custom(existUserById),
    validationFields,
  ],
  getUserById
);

// create user
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

// update user
router.put(
  "/:id",
  [
    check("id", "Not valid id").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isValidRole),
    validationFields,
  ],
  updateUser
);

// delele user
router.delete("/", deleteUser);

module.exports = router;
