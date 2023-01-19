const express = require("express");
const { Router } = express;
const router = Router();
const getCollectionRandom = require("../utils/randoms.utils.js");
const { fork } = require("child_process");

const logger = require("../utils/logger.js");
router.get("/randoms", (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  let cant = 100000000;
  if (req.query.cant) {
    cant = req.query.cant;
  }

  res.send(getCollectionRandom(cant));
  /*   const subProcess = fork("./factory/child.js");
  subProcess.send(cant);
  subProcess.on("message", (msg) => {
    res.send(msg);
  }); */
});

module.exports = router;
