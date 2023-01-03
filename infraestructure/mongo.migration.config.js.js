const { MongoClient } = require("mongodb");
const mockedBycicles = require("../tests/byciclesForSeeding.js");
const Model = require("../models/nosql/bycicle.js");
const dotenv = require("dotenv");
const { default: mongoose, mongo } = require("mongoose");
dotenv.config();

let client;
let db;
let collection;

const databaseMigrationModule = (function () {
  async function connect() {
    mongoose.set("strictQuery", true);
    try {
      await mongoose.connect(process.env.MONGO_URI_DEVELOPMENT, {
        dbName: "BikehubDB",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnect() {
    await mongoose.disconnect();
  }

  function getConnection() {
    return mongoose.connection;
  }

  async function dropCollection() {
    try {
      await Model.collection.drop();
      console.log("Collection dropped");
    } catch (err) {
      console.log(err);
    }
  }

  async function migrate() {
    client = new MongoClient(process.env.MONGO_URI_DEVELOPMENT);
    try {
      await client.connect();
      db = client.db("BikehubDB");
      collection = db.collection("Testing");

      let documents = await collection.estimatedDocumentCount();
      if (documents > 0)
        await collection.drop().then((status) => {
          console.log(`Drop testing collection => ${status}`);
        });

      // Actual inserting documents.
      await collection.insertMany(mockedBycicles);
      if (documents > 0) {
        console.log("Seeding testing collection complete!");
      }

      // Force client.close() to wait for async operations to finish.
      await client.close();
    } catch (ex) {
      console.error(ex.message);
    }
  }

  return {
    connect: connect,
    disconnect: disconnect,
    getConnection: getConnection,
    dropCollection: dropCollection,
  };
})();

module.exports = databaseMigrationModule;
