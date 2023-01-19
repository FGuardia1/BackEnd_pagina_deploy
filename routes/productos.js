const express = require("express");
const { Router } = express;
const router = Router();
const Authenticated = require("../middlewars/middlewars.js");
const logger = require("../utils/logger.js");
router.get("/home", Authenticated, (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  req.session.resetMaxAge;
  res.render("view/form_table_chat", { nombre: req.user.username });
});

module.exports = router;
