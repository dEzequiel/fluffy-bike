const Model = require("../domain/models/bycicle.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const mockedBycicles = require("./mocked.bycicles.js");

dotenv.config();

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
    let list = getConnection()
      .db.listCollections({
        name: Model.collection.name,
      })
      .toArray();

    try {
      if (list.length !== 0) {
        await Model.collection.drop();
        console.log("Collection dropped");
      }
    } catch (e) {
      if (e.code === 26) {
        console.log("namespace %s not found", Model.collection.name);
      } else {
        throw e;
      }
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
    migrate: migrate,
  };
})();

databaseMigrationModule.migrate();
module.exports = databaseMigrationModule;
