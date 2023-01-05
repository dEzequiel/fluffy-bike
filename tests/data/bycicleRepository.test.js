const database = require("../../database");
const Model = require("../../domain/models/bycicle.js");
const { expect } = require("@jest/globals");
const bycicleRepository = require("../../Domain/BycicleRepository.js");

let connection;

describe("Mongoose testing", () => {
  beforeAll(async () => {
    await database.mongoDbConfig.connect();
    // await Model.collection.drop();
  });

  afterAll(async () => {
    await database.mongoDbConfig.disconnect();
  });

  connection = database.mongoDbConfig.getConnection();

  test("Should connect to database", async () => {
    expect(connection.readyState).toEqual(1); // Status connected. Not connecting, is different.
  });

  test("Model should use testing collection", async () => {
    expect(Model.collection.collectionName).toEqual("Testing");
  });

  describe("Bycicle repository should override prototype chain method and implement with mongoose", () => {
    test("Should implementeation search by id", async () => {
      // Act
      const result = await bycicleRepository.getById(
        "5f3d3b8aa2bcfd321e1c9d66"
      );

      // Assert
      expect(result).not.toBeNull();
    });
  });
});
