const { verify } = require("../utils/jwt.js");

exports.authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = verify(token);
    switch (decoded.role) {
      case "admin":
        req.admin = decoded;
        req.userId = decoded.id;
        break;
      default:
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
