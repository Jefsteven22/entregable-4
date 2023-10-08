const {
  errorLogger,
  errorHandler,
  notFoundErrorHandler,
  ormErrorHandler,
} = require("../middlewares/erros.middleware");

const errorRoutes = (app) => {
  app.use(errorLogger, ormErrorHandler, errorHandler, notFoundErrorHandler);
};

module.exports = errorRoutes;
