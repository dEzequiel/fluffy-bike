const databaseModule = require("../infraestructure/mongoConfig.js");
const { expect } = require("@jest/globals");
const Model = require("../models/nosql/bycicle.js");

let connection;
describe("Mongoose testing", () => {
  beforeAll(async () => {
    await databaseModule.connect();
  });

  afterAll(async () => {
    await databaseModule.disconnect();
  });

  connection = databaseModule.getConnection();

  test("Should connect to database", async () => {
    expect(connection.readyState).toEqual(1); // Status connected. Not connecting, is different.
  });

  test("Model should use testing collection", async () => {
    expect(Model.collection.collectionName).toEqual("Testing");
  });

  test("Should know how many documents exists in testing collection", async () => {
    const count = await Model.estimatedDocumentCount();
    expect(count).toEqual(6);
  });
});

test("Should disconnect from database", () => {
  expect(connection.readyState).toEqual(0); // Outside describe() because it's neede to run afterAll().
});
