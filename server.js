const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const router = require("./routes/router.js");
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);
app.get("/", (req, res) => {
  return res.json({ message: "API server is running!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
