const { Router } = require("express");
const productConroller = require("../controller/productConroller.js");
const productRouter = Router();

productRouter.post("/", productConroller.addProduct);
productRouter.get("/", productConroller.getProducts);

productRouter.get("/:id", productConroller.getProductById);
productRouter.put("/:id", productConroller.updateProduct);
productRouter.delete("/:id", productConroller.deleteProduct);

module.exports = productRouter;