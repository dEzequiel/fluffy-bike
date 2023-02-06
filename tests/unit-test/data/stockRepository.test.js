const database = require("../../../database").mongoDb;
const StockRepository =
  require("../../../database/data-access").StockRepository;
const StockModel = require("../../../Domain/models").StockModel;
const Repository = require("../../../database/data-access").Repository;
const { expect } = require("@jest/globals");
var assert = require("assert");
const ObjectId = require("mongodb").ObjectId;

describe("StockRepository should override prototype chain inherit methods from Repository", () => {
  test("StockRepository dont have own methods, they are inherit from prototype", () => {
    // Arrange
    const sut = new StockRepository();

    // Assert
    expect(sut.hasOwnProperty("getAll")).toBeFalsy();
    expect(sut.hasOwnProperty("getById")).toBeFalsy();
    expect(sut.hasOwnProperty("add")).toBeFalsy();
    expect(sut.hasOwnProperty("update")).toBeFalsy();
    expect(sut.hasOwnProperty("delete")).toBeFalsy();
  });
});

let connection;
describe("StockRepository implementation/integration tests", () => {
  beforeAll(async () => {
    await database.connect();
  });

  afterEach(async () => {
    await StockModel.collection.drop();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  connection = database.getConnection();

  test("Should create new stock for a stop with empty bycicles catalog", async () => {
    // Arrange
    const sut = new StockRepository();
    const id = ObjectId();

    // Act
    const stock = await sut.createStock(id);

    // Assert
    expect(stock).not.toBeNull();
    expect(stock._id).not.toBeNull();
    expect(stock.shopId).not.toBeNull();
    expect(stock.bycicles).not.toBeNull();
    expect(stock.bycicles.length).toBe(0);
  });

  test("Should add a bycicle to a existing stock", async () => {
    // Arrange
    const sut = new StockRepository();
    const shopId = ObjectId();
    const bycicleId = ObjectId();
    const stock = await sut.createStock(shopId);

    // Act
    const result = await sut.addBycicleToStock(stock._id, bycicleId, 1);

    // Assert
    expect(result.bycicles.length).toBe(1);
  });

  test("Should delete existing stock", async () => {
    // Arrange
    const sut = new StockRepository();
    const shopId = ObjectId();
    const stock = await sut.createStock(shopId);
    const expectedMessage = `No document found with id: ${stock._id}`;

    // Act
    const result = await sut.delete(stock._id);

    // Assert
    expect(result).not.toBeNull();
    await expect(sut.getById(stock._id)).rejects.toEqual(expectedMessage);
  });
});
