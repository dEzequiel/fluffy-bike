const { expect } = require("@jest/globals");
const infraestructure = require("../../infraestructure");
const Model = require("../../models/nosql/bycicle.js");
const ObjectId = require("mongodb").ObjectId;
const services = require("../../services/");
const { Error } = require("mongoose");

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
      expect(Object.keys(result)).toEqual(Object.keys(contextObjectUnderTest));
    });

    test("Should return message becauses DAO was not found", async () => {
      // Arrange
      const contextObjectUnderTest = { id: "13b1db13b2ade9465c9c5d0d" };
      const expectedMessage = `No document found with id: ${contextObjectUnderTest.id}`;

      //Act
      const result =
        await services.byciclesService.bycicleServiceApi.getByIdAsync(
          contextObjectUnderTest
        );

      //Assert
      expect(result).toEqual(expectedMessage);
    });

    test("Should throw error when id is not valid", async () => {
      // Arrange
      const contextObjectUnderTest = { id: "123TEST_INVALID_ID" };

      // Act & Assert
      await expect(
        services.byciclesService.bycicleServiceApi.getByIdAsync(
          contextObjectUnderTest
        )
      ).rejects.toThrow(Error.CastError);
    });
  });
});

test("Should disconnect from database", () => {
  expect(connection.readyState).toEqual(0); // Outside describe() because it's neede to run afterAll().
});
