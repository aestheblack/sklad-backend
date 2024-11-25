const { Router } = require("express");
const productRoutes = require("./productRoutes.js");
const router = Router();

router.use("/products", productRoutes);

module.exports = router;