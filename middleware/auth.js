const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid access token" });
    req.user = user;
    next();
  });
};

const authorizeRoles = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Forbidden: Insufficient permissions",
        });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
};