const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("../src/connection.js");
const routes = require("./src/routes/router.js");
const PORT = 5001;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  return res.json({ message: "CDN server is running!" });
});

function startServerOnPort(port) {
  const listen = app.listen(port, () =>
    console.log(`CDN is running on port ${port}`)
  );
  listen.on("error", () => {
    console.log(`Port ${port} is busy. Trying a different port...`);
    startServerOnPort(port + 1);
  });
}

startServerOnPort(PORT);
