const logger = require("../utils/logger.js");
const Authenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/login");
  next();
};

module.exports = Authenticated;
