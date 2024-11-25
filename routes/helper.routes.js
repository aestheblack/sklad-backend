const { Router } = require("express");
const helperController = require("../controllers/helper.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const helperRouter = Router();

helperRouter.post("/login", helperController.loginHelper);
helperRouter.post("/register", authenticate, requireRole(["admin"]), helperController.addHelper);
helperRouter.put("/update-helper", authenticate, requireRole(["helper"]), helperController.meUpdateHelper);
helperRouter.get("/", authenticate, requireRole(["admin"]), helperController.getAllHelpers);
helperRouter.get("/me", authenticate, requireRole(["helper"]), helperController.getMeHelper);
helperRouter.get("/search", authenticate, requireRole(["admin"]), helperController.searchByUsernameOrFullName);
helperRouter.put("/:id", authenticate, requireRole(["admin", "helper"]), helperController.meUpdateHelper);
helperRouter.delete("/:id", authenticate, requireRole(["admin"]), helperController.deleteHelper);
helperRouter.get("/:id", authenticate, requireRole(["helper", "admin"]), helperController.getHelperById);

module.exports = helperRouter;