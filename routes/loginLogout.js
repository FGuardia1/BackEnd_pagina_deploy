const express = require("express");
const { Router } = express;
const router = Router();
const passport = require("passport");
const logger = require("../utils/logger.js");
router.get("/", (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.redirect("/login");
});
router.get("/login", (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.render("view/login");
});
router.get("/register", (req, res, next) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.render("view/register");
});

router.get("/failregister", (req, res) => {
  res.render("view/register-error", {});
});
router.get("/faillogin", (req, res) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  res.render("view/login-error", {});
});

router.get("/logout", (req, res) => {
  logger.info(
    `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
  );
  const username = req.user.username;
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.render("view/logout", { username });
  });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    logger.info(
      `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
    );
    res.redirect("/home");
  }
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  (req, res) => {
    logger.info(
      `Se accedio a la ruta ${req.originalUrl} por el metodo ${req.method} `
    );
    res.redirect("/home");
  }
);

module.exports = router;
