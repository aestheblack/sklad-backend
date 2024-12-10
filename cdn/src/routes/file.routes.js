const { Router } = require("express");
const fileController = require("../controllers/file.controller.js");
const fileRoutes = Router();

fileRoutes.post("/upload", fileController.upload);

module.exports = fileRoutes;