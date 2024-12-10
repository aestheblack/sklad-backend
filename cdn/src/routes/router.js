const { Router } = require("express");
const fileRoutes = require("./file.routes.js");
const router = Router();

router.use("/files", fileRoutes);
module.exports = router;