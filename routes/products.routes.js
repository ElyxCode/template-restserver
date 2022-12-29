const { Router } = require("express");

const { check } = require("express-validator");
const {
  createProducts,
  getProducts,
} = require("../controllers/products.controllers");
const { existCategories } = require("../helpers/db-validators");
const { validJWT, validationFields } = require("../middlewares");

const router = Router();

// get products
router.get("/", getProducts);

// get products by id

// create products
router.post(
  "/",
  [
    validJWT,
    check("name", "The name is required").not().isEmpty(),
    check("category", "Not valid id").isMongoId(),
    check("category").custom(existCategories),
    validationFields,
  ],
  createProducts
);
// update products

// delete products

module.exports = router;
