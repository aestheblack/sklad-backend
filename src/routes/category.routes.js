const { Router } = require("express");
const categoryConroller = require("../controllers/category.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const categoryRouter = Router();

categoryRouter.post("/", authenticate, categoryConroller.addCategory);
categoryRouter.get("/", authenticate, categoryConroller.getAllCategories);
categoryRouter.get("/search", authenticate, categoryConroller.searchCategoriesByName);

categoryRouter.get("/:id", authenticate, categoryConroller.getCategoryById);
categoryRouter.put("/:id", authenticate, categoryConroller.updateCategory);
categoryRouter.delete("/:id", authenticate, categoryConroller.deleteCategory);

module.exports = categoryRouter;