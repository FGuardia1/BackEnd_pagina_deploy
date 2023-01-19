const express = require("express");
const { Router } = express;
const numCpu = require("os").cpus().length;
const router = Router();
const Authenticated = require("../middlewars/middlewars.js");
const compression = require("compression");
const logger = require("../utils/logger.js");
router.get("/info", compression(), (req, res, next) => {
  /*   console.log({
    argumentos: process.argv,
    nombrePlataforma: process.platform,
    versionNode: process.version,
    memoria: process.resourceUsage().maxRSS,
    pathEjec: process.execPath,
    IdProceso: process.pid,
    carpetaProy: process.cwd(),
    cantProc: numCpu,
  }); */

  res.render("view/info", {
    argumentos: process.argv,
    nombrePlataforma: process.platform,
    versionNode: process.version,
    memoria: process.resourceUsage().maxRSS,
    pathEjec: process.execPath,
    IdProceso: process.pid,
    carpetaProy: process.cwd(),
    cantProc: numCpu,
  });
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
});

router.get("/*", (req, res, next) => {
  res.send("error 404, pagina no encontrada");
  logger.warn(
    `Se intento acceder a la ruta inexistente ${req.originalUrl} por el metodo ${req.method} `
  );
});

module.exports = router;
