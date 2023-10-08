const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");
const userRoutes = require("../modules/users/user.routes");
const conversationsRoutes = require("../modules/conversations/conversations.routes");

const apiv1Routes = (app) => {
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/conversations", conversationsRoutes);
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // devera ser capaz de visualizar la doc
};

module.exports = apiv1Routes;
