const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // routes path
    this.routePathUser = "/api/users";

    // connect to database
    this.connectDB();

    // middlewares
    this.middlewares();

    //routes
    this.router();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // parse to json
    this.app.use(express.json());

    // public directory
    this.app.use(express.static("public"));
  }

  router() {
    this.app.use(this.routePathUser, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server listen port ${this.port}`);
    });
  }
}

module.exports = Server;
