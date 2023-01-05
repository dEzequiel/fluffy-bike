const database = require("../../database");
const Model = require("../../domain/models/bycicle.js");
const { expect } = require("@jest/globals");
const ObjectId = require("mongodb").ObjectId;
const BycicleRepository = require("../../Domain/BycicleRepository.js");
const Repository = require("../../Domain/Repository");

describe("Bycicle repository should override prototype chain inherit methods", () => {
  test("Repository has own prototype methods", () => {
    // Arrange
    const sut = new Repository();
    expect(sut.hasOwnProperty("getAll")).toBeTruthy();
    expect(sut.hasOwnProperty("getById")).toBeTruthy();
  });

  test("BycicleRepository has own prototype methods", () => {
    // Arrange
    const sut = new BycicleRepository();
    expect(sut.hasOwnProperty("getAll")).toBeTruthy();
    expect(sut.hasOwnProperty("getById")).toBeTruthy();
  });

  test("BycicleRepository prototype has own prototype methods", () => {
    // Arrange
    const sut = new BycicleRepository(Model);
    expect(sut.__proto__.hasOwnProperty("getAll")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("getById")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("model")).toBeFalsy();
  });
});

let connection;
describe("Bycicle repositorion implementation/integration tests", () => {
  beforeAll(async () => {
    await database.mongoDbConfig.connect();
    await Model.collection.drop();
  });

  afterAll(async () => {
    await database.mongoDbConfig.disconnect();
  });

  connection = database.mongoDbConfig.getConnection();

  describe("Connection testing", () => {
    test("Should connect to database", async () => {
      expect(connection.readyState).toEqual(1); // Status connected. Not connecting, is different.
    });

    test("Model should use testing collection", async () => {
      expect(Model.collection.collectionName).toEqual("Testing");
    });
  });

  describe("Bycicle repository implementation tests", () => {
    test("Should retrieve doc from collecion", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const dataUnderTest = new Model({
        _id: ObjectId("63b1db13b2ade9465c9c5d0d"),
        name: "Roadster Elite",
        brand: "Argon 18",
        price: 1299.99,
        type: "Road",
        frame: "Carbon",
        fork: "XC",
        gears: "Derailleur gears",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Road tires",
        suspension: "Hardtail",
        weight: 7.5,
        available: true,
      });

      await dataUnderTest.save();

      const contextObjectUnderTest = {
        id: "63b1db13b2ade9465c9c5d0d",
        name: "Roadster Elite",
        brand: "Argon 18",
        price: 1299.99,
        type: "Road",
        frame: "Carbon",
        fork: "XC",
        gears: "Derailleur gears",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Road tires",
        suspension: "Hardtail",
        weight: 7.5,
        available: true,
      };

      // Act & assert
      const result = await sut.getById("63b1db13b2ade9465c9c5d0d");
      console.log(result);
      // expect(Object.keys(result)).toEqual(Object.keys(contextObjectUnderTest));
    });
  });
});
