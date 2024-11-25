const { Router } = require("express");
const adminRoutes = require("./admin.routes.js");
const helperRoutes = require("./helper.routes.js");
const productRoutes = require("./product.routes.js");
const categoryRoutes = require("./category.routes.js");
const router = Router();

router.use("/admins", adminRoutes);
router.use("/helpers", helperRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;