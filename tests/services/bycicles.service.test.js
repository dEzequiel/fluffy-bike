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
    test("Should return one specific object based on entity returned by data access layer", async () => {
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

    test("Should return collection of objects with same brand property", async () => {
      // Arrange
      const sut = new BycicleRepository();
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
      const addedEntities = await sut.addMany(dataUnderTest);

      // Act
      const result =
        await services.byciclesService.bycicleServiceApi.getByBrandAsync(
          "Argon 18"
        );

      // Assert
      expect(result.length).toBe(2);
      result.forEach((doc) => {
        expect(doc.brand).toBe("Argon 18");
        expect(doc.__proto__).toEqual(Object.prototype);
      });
    });

    test("Should return added object with id property stablished by repository", async () => {
      // Arrange
      const dataToAdd = {
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
      let result = await services.byciclesService.bycicleServiceApi.addAsync(
        dataToAdd
      );
      dataToAdd.id = result.id;

      // Assert
      expect(result.id).toBeDefined();
      expect(result).toEqual(dataToAdd);
    });

    test("Should return deleted object", async () => {
      // Arrange
      const dataToAdd = {
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
      const addedEntity = await repository.add(dataToAdd);

      dataToAdd.id = addedEntity._id.toString();
      // Act
      const result =
        await services.byciclesService.bycicleServiceApi.deleteAsync(
          addedEntity._id
        );

      // Assert
      expect(result).toEqual(dataToAdd);
    });
  });
});
test("Should disconnect from database", () => {
  expect(connection.readyState).toEqual(0); // Outside describe() because it's neede to run afterAll().
});
