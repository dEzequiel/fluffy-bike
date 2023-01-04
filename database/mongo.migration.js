const mockedBycicles = require("../tests/byciclesForSeeding.js");
const Model = require("../domain/models/bycicle.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

dotenv.config();

let client;
let db;
let collection;

const databaseMigrationModule = (function () {
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
    migrate: migrate,
  };
})();

databaseMigrationModule.migrate();
module.exports = databaseMigrationModule;
