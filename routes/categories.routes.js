const { Router } = require("express");
const { check } = require("express-validator");

const { validationFields } = require("../middlewares/validation-fields");

const router = Router();

// get categories - public
router.get("/", (req, res) => {
  res.json({
    msg: "get",
  });
});

// get categories by id - public
router.get("/:id", (req, res) => {
  res.json({
    msg: "get - id",
  });
});

// create categories - private - only valid token
router.post("/", (req, res) => {
  res.json({
    msg: "create categories",
  });
});

// update categories - private - only valid token
router.put("/:id", (req, res) => {
  res.json({
    msg: "update categories",
  });
});

// delete categories - only admin
router.delete("/:id", (req, res) => {
  res.json({
    msg: "delete categories",
  });
});

module.exports = router;
