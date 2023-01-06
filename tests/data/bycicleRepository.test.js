const database = require("../../database");
const Model = require("../../domain/models/bycicle.js");
const { expect } = require("@jest/globals");
const ObjectId = require("mongodb").ObjectId;
const BycicleRepository = require("../../Domain/BycicleRepository.js");
const Repository = require("../../Domain/Repository");

describe("BycicleRepository should override prototype chain inherit methods from Repository", () => {
  test("Repository prototype has own methods", () => {
    // Arrange
    const sut = new Repository();

    // Assert
    expect(sut.__proto__.hasOwnProperty("getAll")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("getById")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("add")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("update")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("delete")).toBeTruthy();
  });

  test("BycicleRepository dont have own methods, they are inherit from prototype", () => {
    // Arrange
    const sut = new BycicleRepository();

    // Assert
    expect(sut.hasOwnProperty("getAll")).toBeFalsy();
    expect(sut.hasOwnProperty("getById")).toBeFalsy();
    expect(sut.hasOwnProperty("add")).toBeFalsy();
    expect(sut.hasOwnProperty("update")).toBeFalsy();
    expect(sut.hasOwnProperty("delete")).toBeFalsy();
  });

  test("BycicleRepository prototype has own prototype methods implementation", () => {
    // Arrange
    const sut = new BycicleRepository(Model);

    // Assert
    expect(sut.__proto__.hasOwnProperty("getAll")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("getById")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("add")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("remove")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("getByBrand")).toBeTruthy();
  });
});

let connection;
describe("BycicleRepository implementation/integration tests", () => {
  beforeAll(async () => {
    await database.mongoDbConfig.connect();
  });

  afterEach(async () => {
    await database.mongoMigrationConfig.dropCollection();
  });
  afterAll(async () => {
    await database.mongoDbConfig.disconnect();
  });

  connection = database.mongoDbConfig.getConnection();

  describe("Connection testing", () => {
    test("Should connect to database", async () => {
      expect(connection.readyState).toEqual(1);
    });

    test("Model should use testing collection", async () => {
      expect(Model.collection.collectionName).toEqual("Testing");
    });
  });

  describe("BycicleRrepository implementation tests", () => {
    test("Should retrieve doc from collecion with a given id", async () => {
      // Arrange
      const sut = new BycicleRepository(Model);
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

      // Act 
      const result = await sut.getById("63b1db13b2ade9465c9c5d0d");

      // Assert
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
      expect(result._id).toBeDefined();
    });

    test("Should retrieve all docs from collection", async () => {
      // Arrange
      const sut = new BycicleRepository(Model);
      const dataUnderTest = [
        new Model({
          _id: ObjectId("63b859b14552d7ff361a5be5"),
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
        }),
        new Model({
          _id: ObjectId("63b85961c2ad6d4b9048f7e1"),
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
        }),
      ];

      await Model.insertMany(dataUnderTest);

      // Act
      const result = await sut.getAll();

      // Assert
      expect(result).not.toBeNull();
      expect(result.length).toBe(2);
    });

    test("Should retrieve all docs filtered with the same brand", async () => {
      // Arrange
      const sut = new BycicleRepository(Model);
      const dataUnderTest = [
        new Model({
          _id: ObjectId("63b85a6b30b8076e6b5c14ff"),
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
        }),
        new Model({
          _id: ObjectId("63b85a7546f4e3e30fc7d97d"),
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
        }),
        new Model({
          _id: ObjectId("63b85a7abee199663346070c"),
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
        }),
        new Model({
          _id: ObjectId("63b85a7f266a0d3a963d15cc"),
          name: "Roadster Elite",
          brand: "CUBE",
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
        }),
      ];

      await Model.insertMany(dataUnderTest);

      // Act
      const result = await sut.getByBrand("Argon 18");

      // Assert
      expect(result).not.toBeNull();
      expect(result.length).toBe(2);
      result.forEach((doc) => {
        expect(doc.brand).toBe("Argon 18");
      });
    });

    test("Should delete a doc from collection with given id", async () => {
      // Arrange
      const sut = new BycicleRepository(Model);
      const expectedMessage = `No document found with id: 63b859b14552d7ff361a5be5`;
      const dataUnderTest = [
        new Model({
          _id: ObjectId("63b859b14552d7ff361a5be5"),
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
        }),
        new Model({
          _id: ObjectId("63b85961c2ad6d4b9048f7e1"),
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
        }),
      ];

      await Model.insertMany(dataUnderTest);

      // Act
      const result = await sut.remove("63b859b14552d7ff361a5be5");

      // Arrange
      expect(result).not.toBeNull();
      await expect(sut.remove("63b859b14552d7ff361a5be5")).rejects.toEqual(
        expectedMessage
      );
    });

    test("Should add a doc to collection", async () => {
      // Arrange
      const sut = new BycicleRepository(Model);
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
      const result = await sut.add(dataToAdd);

      // Assert
      expect(result).not.toBeNull();
      expect(result._id).not.toBeNull();
      expect(result._id).not.toBeUndefined();
    });
  });
});
