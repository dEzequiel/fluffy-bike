const { expect } = require("@jest/globals");
const infraestructure = require("../../infraestructure");
const Model = require("../../models/nosql/bycicle.js");

let connection;
describe("Services testing", () => {
  beforeAll(async () => {
    await infraestructure.mongoMigrationConfig.connect();
  });

  afterAll(async () => {
    await infraestructure.mongoMigrationConfig.disconnect();
  });

  connection = infraestructure.mongoMigrationConfig.getConnection();

  describe("Mongoose data access testing", () => {
    test("Should connect to database", async () => {
      expect(connection.readyState).toEqual(1); // Status connected. Not connecting, is different.
    });

    test("Model should use testing collection", async () => {
      expect(Model.collection.collectionName).toEqual("Testing");
    });
  });
});

test("Should disconnect from database", () => {
  expect(connection.readyState).toEqual(0); // Outside describe() because it's neede to run afterAll().
});
