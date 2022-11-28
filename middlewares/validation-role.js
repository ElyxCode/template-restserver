const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      success: false,
      msg: "you want to verify the role without validating the token first",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      sucess: false,
      msg: `${name} isn't admin, You can't do this`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        success: false,
        msg: "you want to verify the role without validating the token first",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        msg: `The service requires one of these roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
