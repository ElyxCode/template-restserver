const validationFields = require("./validation-fields");
const validJWT = require("./validation-jwt");
const hasRole = require("./validation-role");

module.exports = {
  ...validationFields,
  ...validJWT,
  ...hasRole,
};
