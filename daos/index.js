const { MockService } = require("../service/mock.service");
const { MensajesDaoFirebase } = require("./mensajes/mensajesDaoFirebase");

let productDAO = new MockService();
let chatDAO = new MensajesDaoFirebase();
module.exports = { productDAO, chatDAO };
