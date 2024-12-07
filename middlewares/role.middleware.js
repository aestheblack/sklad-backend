exports.requireRole = (roles) => (req, res, next) => {
  const userRole = req.admin?.role || req.helper?.role || req.customer?.role;
  if (!roles.includes(userRole)) {
    return res.status(403).json({
      status: "error",
      message: {
        uz: "Ruxsat yo'q",
        ru: "Доступ запрещен",
        en: "Access denied",
      },
    });
  }
  next();
};
