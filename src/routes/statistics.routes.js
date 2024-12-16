const { Router } = require("express");
const statisticsConroller = require("../controllers/statistics.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const statisticsRouter = Router();

statisticsRouter.get("/contracts-month", authenticate, statisticsConroller.contractsByMonth);
statisticsRouter.get("/products-category", authenticate, statisticsConroller.productsByCategory);
statisticsRouter.get("/products-customer", authenticate, statisticsConroller.productsByCustomer);

module.exports = statisticsRouter;