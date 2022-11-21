const { Router } = require("express");

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

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/", deleteUser);

module.exports = router;
