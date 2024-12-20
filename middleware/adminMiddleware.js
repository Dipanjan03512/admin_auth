const isAdminUser = (req, res, next) => {
  if (!req.userInfo) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! User info is missing.",
    });
  }

  if (req.userInfo.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied! Admin rights required.",
    });
  }
  next();
};

module.exports = isAdminUser;
