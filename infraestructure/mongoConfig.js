const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

/**
 * 
 * NODE_ENV=development
 * NODE_ENV=production
 * 
 * Con cross-env establecer valor de variables de entorno independiente
 * del sistema.
 * 
 *  "devstart": "cross-env NODE_ENV=development node ./app.js",
    "start": "cross-env NODE_ENV=production node ./app.js",
 */

var uris = {
  development: process.env.MONGO_URI_DEVELOPMENT,
  production: process.env.MONGO_URI_DEVELOPMENT,
};

const databaseModule = (function () {
  let uri;

  if (process.env.NODE_ENV === "development") {
    uri = uris["development"];
  } else {
    uri = uris["production"];
  }

  async function connect() {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, {
      dbName: "BikehubDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  function getConnection() {
    return mongoose.connection;
  }

  async function disconnect() {
    await mongoose.disconnect();
  }
  /** MODULE PATTERN
   * Object properties pointing to functions
   * returned inside this IIFE.
   *
   * Only this public attributes are available outside
   * this module.
   */
  return {
    connect: connect,
    getConnection: getConnection,
    disconnect: disconnect,
  };
})();

module.exports = databaseModule;
