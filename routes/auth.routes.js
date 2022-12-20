const { Router } = require("express");
const { check } = require("express-validator");

const { validationFields } = require("../middlewares/validation-fields");

const { authLogin, googleSignIn } = require("../controllers/auth.controllers");

const router = Router();

router.post(
  "/login",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validationFields,
  ],
  authLogin
);

router.post(
  "/google",
  [check("id_token", "id_token is required").not().isEmpty(), validationFields],
  googleSignIn
);

module.exports = router;
