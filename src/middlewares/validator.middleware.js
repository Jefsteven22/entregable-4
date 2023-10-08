const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (e) {
    next({
      status: 400,
      error: "Invalid data",
      message: e.array().map((e) => e.msg),
    });
  }
};
module.exports = validateResult;
