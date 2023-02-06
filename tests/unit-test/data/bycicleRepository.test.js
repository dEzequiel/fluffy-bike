const database = require("../../../database").mongoDb;
const BycicleModel = require("../../../Domain/models").BycicleModel;
const BycicleRepository =
  require("../../../database/data-access").BycicleRepository;
const Repository = require("../../../database/data-access").Repository;
const { expect } = require("@jest/globals");
var assert = require("assert");
const ObjectId = require("mongodb").ObjectId;

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
    const sut = new BycicleRepository();

    // Assert
    expect(sut.__proto__.hasOwnProperty("getAll")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("getById")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("add")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("delete")).toBeTruthy();
    expect(sut.__proto__.hasOwnProperty("getByBrand")).toBeTruthy();
  });
});

let connection;
describe("BycicleRepository implementation/integration tests", () => {
  beforeAll(async () => {
    await database.connect();
  });

  afterEach(async () => {
    await BycicleModel.collection.drop();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  connection = database.getConnection();
  describe("BycicleRepository implementation tests", () => {
    test("Should get a document from collecion with a given id", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const bycicleData = new BycicleModel({
        _id: ObjectId("63b1db13b2ade9465c9c5d0d"),
        name: "Roadster Elite",
        brand: "Argon 18",
        type: "Road",
        frame: "Carbon",
        fork: "XC",
        gears: "Derailleur gears",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Road tires",
        suspension: "Hardtail",
        weight: 7.5,
      });

      await bycicleData.save();

      // Act
      const result = await sut.getById("63b1db13b2ade9465c9c5d0d");

      // Assert
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
      expect(result._id).toBeDefined();
      assert.equal(result._id.toString(), "63b1db13b2ade9465c9c5d0d");
    });

    test("Should get all documents from collection", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const byciclesData = [
        new BycicleModel({
          _id: ObjectId("63b859b14552d7ff361a5be5"),
          name: "Roadster Elite",
          brand: "Argon 18",
          type: "Road",
          frame: "Carbon",
          fork: "XC",
          gears: "Derailleur gears",
          brakes: "Hydraulic Disc",
          wheels: "700c",
          tires: "Road tires",
          suspension: "Hardtail",
          weight: 7.5,
        }),
        new BycicleModel({
          _id: ObjectId("63b85961c2ad6d4b9048f7e1"),
          name: "Roadster Elite",
          brand: "Argon 18",
          type: "Road",
          frame: "Carbon",
          fork: "XC",
          gears: "Derailleur gears",
          brakes: "Hydraulic Disc",
          wheels: "700c",
          tires: "Road tires",
          suspension: "Hardtail",
          weight: 7.5,
        }),
      ];

      await BycicleModel.insertMany(byciclesData);

      // Act
      const result = await sut.getAll();

      // Assert
      expect(result).not.toBeNull();
      expect(result.length).toBe(2);
    });

    test("Should get all documents filtered with the same brand", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const byciclesData = [
        new BycicleModel({
          _id: ObjectId("63b85a6b30b8076e6b5c14ff"),
          name: "Roadster Elite",
          brand: "Argon 18",
          type: "Road",
          frame: "Carbon",
          fork: "XC",
          gears: "Derailleur gears",
          brakes: "Hydraulic Disc",
          wheels: "700c",
          tires: "Road tires",
          suspension: "Hardtail",
          weight: 7.5,
        }),
        new BycicleModel({
          _id: ObjectId("63b85a7546f4e3e30fc7d97d"),
          name: "Roadster Elite",
          brand: "All City",
          type: "Road",
          frame: "Carbon",
          fork: "XC",
          gears: "Derailleur gears",
          brakes: "Hydraulic Disc",
          wheels: "700c",
          tires: "Road tires",
          suspension: "Hardtail",
          weight: 7.5,
        })
      ];

      await BycicleModel.insertMany(byciclesData);

      // Act
      const result = await sut.getByBrand("Argon 18");

      // Assert
      expect(result.length).toBe(1);
      result.forEach((doc) => {
        expect(doc.brand).toBe("Argon 18");
      });
    });

    test("Should return rejected promise with message because entities were found", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const brand = "Argon 18";
      const expectedMessage = `No document found with brand: ${brand}`;

      const bycicleData = new BycicleModel({
        _id: ObjectId("63b1db13b2ade9465c9c5d0d"),
        name: "Roadster Elite",
        brand: "All City",
        type: "Road",
        frame: "Carbon",
        fork: "XC",
        gears: "Derailleur gears",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Road tires",
        suspension: "Hardtail",
        weight: 7.5,
      });

      await bycicleData.save();

      // Act & assert
      await expect(sut.getByBrand("Argon 18")).rejects.toEqual(expectedMessage);
    });

    test("Should add a document to collection", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const bycicleData = {
        name: "Roadster Elite",
        brand: "Argon 18",
        type: "Road",
        frame: "Carbon",
        fork: "XC",
        gears: "Derailleur gears",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Road tires",
        suspension: "Hardtail",
        weight: 7.5,
      };

      // Act
      const result = await sut.add(bycicleData);

      // Assert
      expect(result).not.toBeNull();
      expect(result._id).not.toBeNull();
      expect(result._id).not.toBeUndefined();
    });

    test("Should add many documents to collection", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const byciclesData = [
        {
          name: "Roadster Elite",
          brand: "Argon 18",
          type: "Road",
          frame: "Carbon",
          fork: "XC",
          gears: "Derailleur gears",
          brakes: "Hydraulic Disc",
          wheels: "700c",
          tires: "Road tires",
          suspension: "Hardtail",
          weight: 7.5,
        },
        {
          name: "Roadster Elite",
          brand: "All City",
          type: "Road",
          frame: "Carbon",
          fork: "XC",
          gears: "Derailleur gears",
          brakes: "Hydraulic Disc",
          wheels: "700c",
          tires: "Road tires",
          suspension: "Hardtail",
          weight: 7.5,
        },
      ];

      // Act
      const result = await sut.addMany(byciclesData);

      // Assert
      expect(result).not.toBeNull();
      expect(result.length).toBe(2);
      result.forEach((doc) => {
        expect(doc._id).not.toBeNull();
        expect(doc._id).not.toBeUndefined();
      });
    });

    test("Should delete a document from collection", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const id = "63b859b14552d7ff361a5be5";
      const expectedMessage = `No document found with id: ${id}`;
      const byciclesData = [
        new BycicleModel({
          _id: ObjectId("63b859b14552d7ff361a5be5"),
          name: "Roadster Elite",
          brand: "Argon 18",
          type: "Road",
          frame: "Carbon",
          fork: "XC",
          gears: "Derailleur gears",
          brakes: "Hydraulic Disc",
          wheels: "700c",
          tires: "Road tires",
          suspension: "Hardtail",
          weight: 7.5,
        }),
        new BycicleModel({
          _id: ObjectId("63b85961c2ad6d4b9048f7e1"),
          name: "Roadster Elite",
          brand: "Argon 18",
          type: "Road",
          frame: "Carbon",
          fork: "XC",
          gears: "Derailleur gears",
          brakes: "Hydraulic Disc",
          wheels: "700c",
          tires: "Road tires",
          suspension: "Hardtail",
          weight: 7.5,
        }),
      ];

      await BycicleModel.insertMany(byciclesData);

      // Act
      const result = await sut.delete(id);

      // Arrange
      expect(result).not.toBeNull();
      await expect(sut.getById(id)).rejects.toEqual(expectedMessage);
    });

    test("Sould reject promise because document id to delete was not found", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const id = "63b992871d47bc3d793d53d9";
      const expectedMessage = `No document found with id: ${id}`;
      const bycicleData = new BycicleModel({
        _id: ObjectId("63b1db13b2ade9465c9c5d0d"),
        name: "Roadster Elite",
        brand: "All City",
        type: "Road",
        frame: "Carbon",
        fork: "XC",
        gears: "Derailleur gears",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Road tires",
        suspension: "Hardtail",
        weight: 7.5,
      });

      await bycicleData.save();
      // Act & assert
      await expect(sut.delete(id)).rejects.toEqual(expectedMessage);
    });

    test("Should update document", async () => {
      // Arrange
      const sut = new BycicleRepository();
      const updateData = {
        name: "Update test",
        type: "Update test",
      };
      const bycicleData = new BycicleModel({
        _id: ObjectId("63b85961c2ad6d4b9048f7e1"),
        name: "Roadster Elite",
        brand: "Argon 18",
        type: "Road",
        frame: "Carbon",
        fork: "XC",
        gears: "Derailleur gears",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Road tires",
        suspension: "Hardtail",
        weight: 7.5,
      });

      await bycicleData.save();

      // Act
      const result = await sut.update(bycicleData._id, updateData);

      // Assert
      assert.equal(result._id.toString(), bycicleData._id.toString());
      expect(result.name).toBe("Update test");
      expect(result.type).toBe("Update test");
    });
  });
});
