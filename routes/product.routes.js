const { Router } = require("express");
const productConroller = require("../controllers/product.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const productRouter = Router();

productRouter.get("/", authenticate, requireRole(["admin", "helper"]), productConroller.getProducts);
productRouter.get("/search", authenticate, requireRole(["admin", "helper"]), productConroller.searchProductsByName);
productRouter.get("/search", authenticate, requireRole(["admin", "helper"]), productConroller.searchProductsByBarcode);
productRouter.post("/", authenticate, requireRole(["admin", "helper"]), productConroller.addProduct);
productRouter.get("/:id", authenticate, requireRole(["admin", "helper"]), productConroller.getProductById);
productRouter.put("/:id", authenticate, requireRole(["admin", "helper"]), productConroller.updateProduct);
productRouter.delete("/:id", authenticate, requireRole(["admin", "helper"]), productConroller.deleteProduct);

module.exports = productRouter;