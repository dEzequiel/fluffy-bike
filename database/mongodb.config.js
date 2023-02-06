const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

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
    try {
      await mongoose.connect(uri, {
        dbName: "BikehubDB",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(err);
    }
  }

  function getConnection() {
    return mongoose.connection;
  }

  async function disconnect() {
    await mongoose.disconnect();
    await mongoose.connection.close();
  }

  async function dropCollection() {
    try {
      getConnection().db.dropCollection("Testing");
      console.log("Collection dropped");
    } catch (err) {
      console.log(err);
    }
  }
  return {
    connect: connect,
    getConnection: getConnection,
    disconnect: disconnect,
    dropCollection: dropCollection,
  };
})();

module.exports = databaseModule;
