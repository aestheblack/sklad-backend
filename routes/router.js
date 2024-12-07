const { Router } = require("express");
const adminRoutes = require("./admin.routes.js");
const helperRoutes = require("./helper.routes.js");
const productRoutes = require("./product.routes.js");
const categoryRoutes = require("./category.routes.js");
const customerRoutes = require("./customer.routes.js");
const contractRoutes = require("./contract.routes.js");
const router = Router();

router.use("/admins", adminRoutes);
router.use("/helpers", helperRoutes);
router.use("/products", productRoutes);
router.use("/customers", customerRoutes);
router.use("/contracts", contractRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;