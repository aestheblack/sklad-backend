const { Router } = require("express");
const contractController = require("../controllers/contract.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const contractRouter = Router();

contractRouter.post("/", authenticate, requireRole(["admin", "helper"]), contractController.createContract);
contractRouter.get("/", authenticate, requireRole(["admin", "helper"]), contractController.getAllContracts);
contractRouter.get("/search", authenticate, requireRole(["admin", "helper", "customer"]), contractController.searchContractsByContractNumber);

contractRouter.get("/:id", authenticate, requireRole(["admin", "helper"]), contractController.getContractById);
contractRouter.put("/:id", authenticate, requireRole(["admin", "helper"]), contractController.updateContract);
contractRouter.delete("/:id", authenticate, requireRole(["admin", "helper"]), contractController.deleteContract);

module.exports = contractRouter;