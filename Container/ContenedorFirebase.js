require("dotenv").config();
const env = process.env;
const admin = require("firebase-admin");
const credential = require("../utils/credentials.js");

const serviceAccount = credential.db_firebase;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
let db;

class ContenedorFirebase {
  constructor(coleccion) {
    this.init(coleccion);
    ///No se puede user async en un constructor
  }
  async init(coleccion) {
    try {
      db = admin.firestore();
      console.log("FIREBASE CONECTADO");
    } catch (e) {
      console.log("ERROR AL CONECTAR A FIREBASE ", e);
    }
    this.collections = db.collection(coleccion);
  }
  async create(data) {
    try {
      const document = this.collections.doc();
      // nos brinda un documento temporal con un id autogenerado
      await document.create(data);
      return document.id;
      // ese documento le agrega datos y lo guarda
      console.log("creado !");
    } catch (e) {
      console.error("Error al buscar los docuementos: ", e);
    }
  }

  async getById(id) {
    try {
      const document = await this.collections.doc(id).get();
      return { ...document.data(), id: document.id };
    } catch (e) {
      console.error("Error al buscar un docuemento: ", e);
    }
  }
  async getAll() {
    try {
      const document = await this.collections.get();
      let myDoc = document.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return myDoc.sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (e) {
      console.error("Error al crear un docuemento: ", e);
    }
  }

  async modify(id, data) {
    try {
      const document = this.collections.doc(id);
      await document.update(data);
      console.log("updateado !");
    } catch (e) {
      console.error("Error al updatear un docuemento: ", e);
    }
  }

  async delete(id) {
    try {
      const document = this.collections.doc(id);
      await document.delete();
      console.log("eliminado !");
    } catch (e) {
      console.error("Error al eliminar un documento: ", e);
    }
  }
}

module.exports = { ContenedorFirebase };
