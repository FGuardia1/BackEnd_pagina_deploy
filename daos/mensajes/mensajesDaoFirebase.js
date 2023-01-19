const { ContenedorFirebase } = require("../../Container/ContenedorFirebase");

class MensajesDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("mensajes");
  }
}

module.exports = { MensajesDaoFirebase };
