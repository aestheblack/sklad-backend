const { Router } = require("express");
const customerController = require("../controllers/customer.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const customerRouter = Router();

customerRouter.post("/",authenticate, customerController.addCustomer);
customerRouter.get("/", authenticate, customerController.getAllCustomers);
customerRouter.get("/search", authenticate, customerController.searchCustomersByName);

customerRouter.get("/:id", authenticate, customerController.getCustomerById);
customerRouter.put("/:id", authenticate, customerController.updateCustomer);
customerRouter.delete("/:id", authenticate, customerController.deleteCustomer);

module.exports = customerRouter;