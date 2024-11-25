const { Router } = require("express");
const adminController = require("../controllers/admin.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const adminRouter = Router();

adminRouter.post("/register", adminController.registerAdmin);
adminRouter.post("/login", adminController.loginAdmin);
adminRouter.get("/", authenticate, requireRole(["admin"]), adminController.getAllAdmins);
adminRouter.get("/me", authenticate, requireRole(["admin"]), adminController.getMeAdmin);
adminRouter.put("/update-admin", authenticate, requireRole(["admin"]), adminController.meUpdateAdmin);

adminRouter.get("/:id", authenticate, requireRole(["admin"]), adminController.getAdminById);
adminRouter.put("/:id", authenticate, requireRole(["admin"]), adminController.updateAdmin);
adminRouter.delete("/:id", authenticate, requireRole(["admin"]), adminController.deleteAdmin);

module.exports = adminRouter;