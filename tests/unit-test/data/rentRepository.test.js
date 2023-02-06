const database = require("../../../database").mongoDb;
const RentModel = require("../../../Domain/models").RentModel;
const RentRepository = require("../../../database/data-access").RentRepository;
const { expect } = require("@jest/globals");
var assert = require("assert");
const ObjectId = require("mongodb").ObjectId;

describe("RentRepository should override prototype chain inherit methods from Repository", () => {
  test("RentRepository dont have own methods, they are inherit from prototype", () => {
    // Arrange
    const sut = new RentRepository();

    // Assert
    expect(sut.hasOwnProperty("getAll")).toBeFalsy();
    expect(sut.hasOwnProperty("getById")).toBeFalsy();
    expect(sut.hasOwnProperty("add")).toBeFalsy();
    expect(sut.hasOwnProperty("update")).toBeFalsy();
    expect(sut.hasOwnProperty("delete")).toBeFalsy();
  });
});

let connection;
describe("RentRepository implementation/integration tests", () => {
  beforeAll(async () => {
    await database.connect();
  });

  afterEach(async () => {
    await RentModel.collection.drop();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  connection = database.getConnection();

  test("Should create a pool of rents for a shop that exists", async () => {
    // Arrange
    const sut = new RentRepository();
    const shopId = ObjectId();

    // Act
    const result = await sut.createRentPool(shopId);

    // Assert
    expect(result).not.toBeNull();
    expect(result._id).not.toBeNull();
    expect(result.shop).not.toBeNull();
    expect(result.bycicles).not.toBeNull();
    expect(result.bycicles.length).toBe(0);
  });

  test("Should add available bycicle option to pool of rents", async () => {
    // Arrange
    const sut = new RentRepository();
    const shopId = ObjectId();
    const bycicleId = ObjectId();
    const rentPool = await sut.createRentPool(shopId);

    // Act
    const result = await sut.addByciclesToRentPool(shopId, bycicleId, true);

    // Assert
    expect(result).not.toBeNull();
    expect(result._id).not.toBeNull();
    expect(result.shop).not.toBeNull();
    expect(result.bycicles).not.toBeNull();
    expect(result.bycicles.length).toBe(1);
  });

  test("Should update available status to false when a bycicle from a shop is rented", async () => {
    // Arrange
    const sut = new RentRepository();
    const shopId = ObjectId();
    const bycicleId = ObjectId();

    await sut.createRentPool(shopId);
    await sut.addByciclesToRentPool(shopId, bycicleId, true);

    // Act
    const result = await sut.rentBike(shopId, bycicleId);

    // Assert
    expect(result.bycicles[0].available).toBe(false);
  });

  test("Should update available status to true when a bycicle is unreted", async () => {
    // Arrange
    const sut = new RentRepository();
    const shopId = ObjectId();
    const bycicleId = ObjectId();

    await sut.createRentPool(shopId);
    await sut.addByciclesToRentPool(shopId, bycicleId, true);
    await sut.rentBike(shopId, bycicleId);

    // Act
    const result = await sut.unrentBike(shopId, bycicleId);

    // Assert
    expect(result.bycicles[0].available).toBe(true);
  });

  test("Should return a list of bycicles rented by a shop", async () => {
    // Arrange
    const sut = new RentRepository();
    const shopId = ObjectId();
    const bycicleId = ObjectId();
    const bycicleId2 = ObjectId();

    await sut.createRentPool(shopId);
    await sut.addByciclesToRentPool(shopId, bycicleId, true);
    await sut.addByciclesToRentPool(shopId, bycicleId2, false);

    // Act
    const result = await sut.getByciclesFilterByRent(shopId, false);

    // Assert
    expect(result.bycicles.length).toBe(1);
    expect(result.bycicles[0].available).toBe(false);
  });

  test("Should return a list of bycicles available for rent by a shop", async () => {
    // Arrange
    const sut = new RentRepository();
    const shopId = ObjectId();
    const bycicleId = ObjectId();
    const bycicleId2 = ObjectId();

    await sut.createRentPool(shopId);
    await sut.addByciclesToRentPool(shopId, bycicleId, true);
    await sut.addByciclesToRentPool(shopId, bycicleId2, false);

    // Act
    const result = await sut.getByciclesFilterByRent(shopId, true);

    // Assert
    expect(result.bycicles.length).toBe(1);
    expect(result.bycicles[0].available).toBe(true);
  });
});
