const { Router } = require("express");
const adminController = require("../controllers/admin.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const adminRouter = Router();

adminRouter.post("/register", adminController.registerAdmin);
adminRouter.post("/login", adminController.loginAdmin);
adminRouter.get("/", authenticate, adminController.getAllAdmins);
adminRouter.get("/me", authenticate, adminController.getMeAdmin);
adminRouter.put("/update-admin", authenticate, adminController.meUpdateAdmin);

adminRouter.get("/:id", authenticate, adminController.getAdminById);
adminRouter.put("/:id", authenticate, adminController.updateAdmin);
adminRouter.delete("/:id", authenticate, adminController.deleteAdmin);

module.exports = adminRouter;
