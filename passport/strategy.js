const User = require("../models/user.js");
const bCrypt = require("bcrypt");

const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};
var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
const login = (req, username, password, cb) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return cb(err);
    if (!user) {
      console.log("Usuario no encontrado " + username);
      return cb(null, false);
    }
    if (!validatePassword(user, password)) {
      console.log("Contra incorrecta");
      return cb(null, false);
    }
    return cb(null, user);
  });
};

const register = (req, username, password, cb) => {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      console.log("Error al registrarse: " + err);
      return cb(err);
    }
    if (user) {
      console.log("Usuario existente");
      return cb(null, false);
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.password = createHash(password);
      newUser
        .save()
        .then((datos) => cb(null, datos))
        .catch(null, false);
    }
  });
};

module.exports = { login, register };
