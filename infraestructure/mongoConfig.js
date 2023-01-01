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
};

const databaseModule = (function () {
  let uri;

  if (process.env.NODE_ENV === "development") {
    uri = uris["development"];
  } else {
    uri = uris["production"];
  }

  let db;
  function connect() {
    mongoose.set("strictQuery", true);
    mongoose.connect(
      uri,
      {
        dbName: "BikehubDB",
        usenewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, res) => {
        if (err) {
          console.log("MongoDB not connected");
        } else {
          console.log("MongoDB connected");
        }
      }
    );

    db = mongoose.connection;
  }

  function getDb() {
    return db;
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
    getDb: getDb,
  };
})();

module.exports = databaseModule;
