const { MongoClient } = require("mongodb");
const mockedBycicles = require("../tests/json_collection/bycicles");
const dotenv = require("dotenv");
dotenv.config();

let client;
let db;

async function migrate() {
  client = new MongoClient(process.env.MONGO_URI_DEVELOPMENT);
  try {
    await client.connect();
    db = client.db("BikehubDB");
    const collection = db.collection("Testing");

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

migrate().catch((err) => {
  console.log(err);
});
