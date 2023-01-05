const { Router } = require("express");
const { check } = require("express-validator");

const { searchTerm } = require("../controllers/search.controllers");
const { validationFields } = require("../middlewares");

const router = Router();

router.get("/:collection/:term", searchTerm);

module.exports = router;
