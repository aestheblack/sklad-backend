const { Router } = require("express");
const customerController = require("../controllers/customer.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const customerRouter = Router();

customerRouter.post("/login", customerController.loginCustomer);
customerRouter.post("/register", authenticate, requireRole(["admin", "helper"]), customerController.registerCustomer);
customerRouter.get("/", authenticate, requireRole(["admin", "helper", "customer"]), customerController.getAllCustomers);

customerRouter.get("/:id", authenticate, requireRole(["admin", "helper", "customer"]), customerController.getCustomerById);
customerRouter.put("/:id", authenticate, requireRole(["admin", "helper", "customer"]), customerController.updateCustomer);
customerRouter.delete("/:id", authenticate, requireRole(["admin", "helper", "customer"]), customerController.deleteCustomer);

module.exports = customerRouter;