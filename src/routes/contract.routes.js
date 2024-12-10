const { Router } = require("express");
const contractController = require("../controllers/contract.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const contractRouter = Router();

contractRouter.post("/", authenticate, contractController.addContract);
contractRouter.get("/", authenticate, contractController.getAllContracts);
contractRouter.get("/search", authenticate, contractController.searchContractsByContractNomer);

contractRouter.get("/:id", authenticate, contractController.getContractById);
contractRouter.put("/:id", authenticate, contractController.updateContract);
contractRouter.delete("/:id", authenticate, contractController.deleteContract);

module.exports = contractRouter;