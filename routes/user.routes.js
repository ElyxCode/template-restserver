const { Router } = require("express");
const { check } = require("express-validator");

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
  [check("email", "The email is not valid").isEmail()],
  createUser
);

router.put("/:id", updateUser);

router.delete("/", deleteUser);

module.exports = router;
