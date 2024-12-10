const { Router } = require("express");
const productConroller = require("../controllers/product.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const productRouter = Router();

productRouter.post("/", authenticate, productConroller.addProduct);
productRouter.get("/", authenticate, productConroller.getAllProducts);
productRouter.get("/search", authenticate, productConroller.searchProductsByName);

productRouter.get("/:id", authenticate, productConroller.getProductById);
productRouter.put("/:id", authenticate, productConroller.updateProduct);
productRouter.delete("/:id", authenticate, productConroller.deleteProduct);

module.exports = productRouter;