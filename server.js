const logger = require("./utils/logger.js");

require("dotenv").config();
const env = process.env;
/* const parseArgs = require("minimist");
const options = {
  default: { puerto: 8080, modo: "fork" },
};
const argumentos = parseArgs(process.argv.slice(2), options); */
/* const MONGO_ATLAS_URL = env.MONGO_ATLAS_URL;
const MONGO_ATLAS_USERS = env.MONGO_ATLAS_USERS; */
const MONGO_ATLAS_URL =
  "mongodb+srv://fer:contra123@cluster0.emeikir.mongodb.net/?retryWrites=true&w=majority";
const MONGO_ATLAS_USERS =
  "mongodb+srv://fer:contra123@cluster0.emeikir.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerceBackend";
/* const PORT = argumentos.puerto;
const MODO = argumentos.modo; */
const PORT = 8080;
const MODO = "fork";

const express = require("express");
const { create } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const { productDAO, chatDAO } = require("./daos");

//const routerProductos = require("./routes/productos.js");
//const routerLogInOut = require("./routes/loginLogout.js");
const routerInfo = require("./routes/info.js");
//const routerRandom = require("./routes/random.js");
//const { normalizar, chatSchema } = require("./utils/normalizar.utils");
const app = express();

//const session = require("express-session");
/* const MongoStore = require("connect-mongo");

const User = require("./models/user.js");
const mongoose = require("mongoose");

app.use(express.static("public"));
const io = new IOServer(httpServer); */
const httpServer = new HttpServer(app);

/* const cookieParser = require("cookie-parser");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const passport = require("passport");
const Strategy = require("passport-local");
const { login, register } = require("./passport/strategy.js");
 */
const cluster = require("cluster");
const numCpu = require("os").cpus().length;

/* passport.use("register", new Strategy({ passReqToCallback: true }, register));
passport.use("login", new Strategy({ passReqToCallback: true }, login));
 */
const hbs = create({
  helpers: {
    arrayVacio(productos) {
      if (productos.length) return false;
      return true;
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_ATLAS_URL,
      mongoOptions: advancedOptions,
    }),
    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
  })
); */

/* app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
 
app.use("/", routerProductos);
app.use("/", routerLogInOut);*/
app.use("/", routerInfo);
/* app.use("/api", routerRandom);

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  try {
    let chat = {
      id: "mensajes",
      mensajes: await chatDAO.getAll(),
    };
    const chat_normalizado = normalizar(chat, chatSchema);

    socket.emit("list-product", productDAO.getAll());
    socket.emit("messages", chat_normalizado);
  } catch (error) {
    logger.error(error);
  }

  socket.on("new-message", (data) => {
    try {
      chatDAO.create(data);
    } catch (error) {
      logger.error(error);
    }

    io.sockets.emit("messages-push", data);
  });

  socket.on("new-product", (data) => {
    try {
      contenedorProd.save(data);
    } catch (error) {
      logger.error(error);
    }

    io.sockets.emit("product-push", data);
  });
}); */

if (MODO == "cluster") {
  if (cluster.isMaster) {
    for (let index = 0; index < numCpu; index++) {
      cluster.fork();
    }
  } else {
    httpServer.listen(PORT, async () => {
      console.log(`Server running on PORT ${PORT}, en modo ${MODO}`);
      /*   try {
        await mongoose.connect(MONGO_ATLAS_USERS, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("DB mongo conectada");
      } catch (error) {
        console.log(`Error en conexión de Base de datos: ${error}`);
      } */
    });
  }
} else {
  httpServer.listen(PORT, async () => {
    console.log(`Server running on PORT ${PORT}, en modo ${MODO}`);
    /*  try {
      await mongoose.connect(MONGO_ATLAS_USERS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB mongo conectada");
    } catch (error) {
      console.log(`Error en conexión de Base de datos: ${error}`);
    } */
  });
}
