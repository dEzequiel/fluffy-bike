const database = require("../../database/");
const Model = require("../../domain/models/bycicle.js");
const services = require("../../services");
const ObjectId = require("mongodb").ObjectId;
const { expect } = require("@jest/globals");
const BycicleRepository = require("../../Domain/BycicleRepository");

let connection;
describe("Services testing", () => {
  beforeAll(async () => {
    await database.mongoMigrationConfig.connect();
  });

  afterEach(async () => {
    await database.mongoMigrationConfig.dropCollection();
  });

  afterAll(async () => {
    await database.mongoMigrationConfig.disconnect();
  });

  connection = database.mongoMigrationConfig.getConnection();
  const repository = new BycicleRepository();
  describe("Connection testing", () => {
    test("Should connect to database and use correct testing collection", async () => {
      expect(connection.readyState).toEqual(1); // Status connected. Not connecting, is different.
      expect(Model.collection.collectionName).toEqual("Testing");
    });
  });

  describe("byciclesService public api integration testing", () => {
    test("Should returno one specific object based on entity returned by data access layer", async () => {
      // Arrange
      const entity = {
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
      const addedEntity = await repository.add(entity);
      const expectedEntity = {
        id: addedEntity._id.toString(),
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
          addedEntity._id
        );

      // Assert
      expect(Object.keys(result)).toEqual(Object.keys(expectedEntity));
      expect(result).toEqual(expectedEntity);
    });

    test("Should return rejected promise with message becauses DAO was not found", async () => {
      // Arrange
      const id = "63b87bb8a647fa3cf184d3d8";
      const expectedMessage = `No document found with id: ${id}`;

      // Act & assert
      await expect(
        services.byciclesService.bycicleServiceApi.getByIdAsync(id)
      ).rejects.toEqual(expectedMessage);
    });

    test("Should return collection of objects returned by data access layer", async () => {
      // Arrange
      const dataUnderTest = [
        {
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
        },
        {
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
        },
      ];
      const addedEntities = await repository.addMany(dataUnderTest);

      const expectedEntities = [
        {
          id: addedEntities[0]._id.toString(),
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
        },
        {
          id: addedEntities[1]._id.toString(),
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
        },
      ];

      // Act
      const result =
        await services.byciclesService.bycicleServiceApi.getAllAsync();

      // Assert
      expect(result.length).toBe(2);
      expect(result[0]).toEqual(expectedEntities[0]);
      expect(result[1]).toEqual(expectedEntities[1]);
    });

    test("Should return rejected promise with message because collection is empty", async () => {
      // Arrange
      const expectedMessage = `Colection is empty`;

      // Act & assert
      await expect(
        services.byciclesService.bycicleServiceApi.getAllAsync()
      ).rejects.toEqual(expectedMessage);
    });

    test("Should return collection of DAO filtered by brand", async () => {
      // Arrange
      const dataUnderTest = [
        {
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
        },
        {
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
        },
        {
          name: "Roadster Elite",
          brand: "All City",
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
        },
      ];

      const addedEntities = await repository.addMany(dataUnderTest);
      // Act
      const result = await repository.getByBrand("Argon 18");

      // Assert
      expect(result.length).toBe(2);
      expect(result[0]._id.toString()).toEqual(addedEntities[0]._id.toString());
      expect(result[1]._id.toString()).toEqual(addedEntities[1]._id.toString());
    });

    test("Should return rejected promise with message because entities were found", async () => {
      // Arrange
      const brand = "Argon 18";
      const expectedMessage = `No document found with brand: ${brand}`;

      // Act & assert
      await expect(repository.getByBrand("Argon 18")).rejects.toEqual(
        expectedMessage
      );
    });
  });
});

test("Should disconnect from database", () => {
  expect(connection.readyState).toEqual(0); // Outside describe() because it's neede to run afterAll().
});
