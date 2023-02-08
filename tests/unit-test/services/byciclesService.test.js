const sut = require("../../../services").byciclesService;
const BycicleModel = require("../../../Domain/models").BycicleModel;
const ObjectId = require("mongodb").ObjectId;
const { expect } = require("@jest/globals");
var assert = require("assert");
const mockingoose = require("mockingoose");

describe("byciclesService public api integration testing", () => {
  test("Should return collection of documents", async () => {
    // Arrange
    const mockedData = [
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
    ];
    mockingoose(BycicleModel).toReturn(mockedData, "find");

    // Act
    const result = await sut.bycicleServiceApi.getAllAsync();

    // Assert
    expect(result.length).toBe(2);
    result.forEach((doc) => {
      expect(doc.id).toBeDefined();
      expect(doc.__proto__).toEqual(Object.prototype);
    });
  });

  test("Should return collection of documents filter by brand", async () => {
    // Arrange
    const mockedData = [
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
    ];

    mockingoose(BycicleModel).toReturn(mockedData, "find");

    // Act
    const result = await sut.bycicleServiceApi.getByBrandAsync("Argon 18");

    // Assert
    expect(result.length).toBe(2);
    result.forEach((doc) => {
      expect(doc.brand).toBe("Argon 18");
      expect(doc.__proto__).toEqual(Object.prototype);
    });
  });

  test("Should add new document stablishing id", async () => {
    // Arrange
    const mockedData = {
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

    mockingoose(BycicleModel).toReturn(mockedData, "save");

    // Act
    const result = await sut.bycicleServiceApi.addAsync(mockedData);

    // Assert
    expect(result.id).toBeDefined();
    expect(result.__proto__).toEqual(Object.prototype);
  });

  test("Should return deleted object", async () => {
    // Arrange
    const mockedData = {
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
    mockingoose(BycicleModel).toReturn(mockedData, "findOneAndRemove");

    // Act
    const result = await sut.bycicleServiceApi.deleteAsync(mockedData._id);

    // Assert
    expect(result.id).toBeDefined();
    expect(result.__proto__).toEqual(Object.prototype);
  });

});
