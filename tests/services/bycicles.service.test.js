const { expect } = require("@jest/globals");
const infraestructure = require("../../Infraestructure/");
const Model = require("../../Domain/models/bycicle.js");
const services = require("../../Application/services");
const ObjectId = require("mongodb").ObjectId;

let connection;
describe("Services testing", () => {
  beforeAll(async () => {
    await infraestructure.mongoMigrationConfig.connect();
    await infraestructure.mongoMigrationConfig.dropCollection();
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

  // Testing unit
  describe("Services public API testing", () => {
    test("Should return object with properties base on founded DAO", async () => {
      // Arrange
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

      // Act
      const result =
        await services.byciclesService.bycicleServiceApi.getByIdAsync(
          contextObjectUnderTest
        );

      // Assert
      expect(result).toHaveProperty("name");
    });

    test("Should return rejected promise with message becauses DAO was not found", async () => {
      // Arrange
      const contextObjectUnderTest = {
        // _id: "63b4884296131f5d3445cad9",
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
      const expectedMessage = `No document found with id: ${contextObjectUnderTest.id}`;

      //Act & assert
      await expect(
        services.byciclesService.bycicleServiceApi.getByIdAsync(
          contextObjectUnderTest
        )
      ).rejects.toEqual(expectedMessage);
    });
  });
});

test("Should disconnect from database", () => {
  expect(connection.readyState).toEqual(0); // Outside describe() because it's neede to run afterAll().
});
