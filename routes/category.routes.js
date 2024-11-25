const { Router } = require("express");
const categoryConroller = require("../controllers/category.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const categoryRouter = Router();

categoryRouter.get("/", authenticate, requireRole(["admin", "helper"]), categoryConroller.getAllCategories);
categoryRouter.get("/search", authenticate, requireRole(["admin", "helper"]), categoryConroller.searchCategoriesByName);
categoryRouter.post("/", authenticate, requireRole(["admin", "helper"]), categoryConroller.addCategory);
categoryRouter.get("/:id", authenticate, requireRole(["admin", "helper"]), categoryConroller.getCategoryById);
categoryRouter.put("/:id", authenticate, requireRole(["admin", "helper"]), categoryConroller.updateCategory);
categoryRouter.delete("/:id", authenticate, requireRole(["admin", "helper"]), categoryConroller.deleteCategory);

module.exports = categoryRouter;