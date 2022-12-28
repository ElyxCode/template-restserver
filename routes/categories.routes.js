const { Router } = require("express");
const { check } = require("express-validator");

const {
  createCategory,
  getCategories,
  getCategoriesById,
} = require("../controllers/categories.controllers");

const { validJWT, validationFields } = require("../middlewares");

const { existCategories } = require("../helpers/db-validators");

const router = Router();

// get categories - public
router.get("/", getCategories);

// get categories by id - public
router.get(
  "/:id",
  [
    check("id", "Not valid id").isMongoId(),
    check("id").custom(existCategories),
    validationFields,
  ],
  getCategoriesById
);

// create categories - private - only valid token
router.post(
  "/",
  [
    validJWT,
    check("name", "The name is required").not().isEmpty(),
    validationFields,
  ],
  createCategory
);

// update categories - private - only valid token
router.put("/:id", check("id").custom(existCategories), (req, res) => {
  res.json({
    msg: "update categories",
  });
});

// delete categories - only admin
router.delete("/:id", check("id").custom(existCategories), (req, res) => {
  res.json({
    msg: "delete categories",
  });
});

module.exports = router;
