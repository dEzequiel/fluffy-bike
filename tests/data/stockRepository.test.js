const database = require("../../database");
const ShopModel = require("../../domain/models/shop.js");
const StockModel = require("../../domain/models/stock.js");
const BycicleModel = require("../../domain/models/bycicle.js");
const ObjectId = require("mongodb").ObjectId;
const Repository = require("../../database/data-access/Repository.js");
const ShopRepository = require("../../database/data-access/ShopRepository.js");
const BycicleRepository = require("../../database/data-access/BycicleRepository.js");
const StockRepository = require("../../database/data-access/StockRepository.js");

describe("StockRepository should override prototype chain inherit methods from Repository", () => {
  test("StockRepository dont have own methods, they are inherit from prototype", () => {
    // Arrange
    const sut = new ShopRepository();

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
    await database.mongoDbConfig.connect();
  });

  afterAll(async () => {
    await database.mongoDbConfig.disconnect();
  });

  afterEach(async () => {
    await StockModel.collection.drop();
  });

  connection = database.mongoDbConfig.getConnection();

  test("Should create new stock for a existing shop with empty bycicles stock", async () => {
    // Arrange
    const sut = new StockRepository();
    const shop = new ShopRepository();

    const addedShop = await shop.createShop("Bike Shop");

    // Act
    const stock = await sut.createStock(addedShop._id);

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
    const shop = new ShopRepository();
    const bycicle = new BycicleRepository();

    const bycicleData = {
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

    const addedShop = await shop.createShop("Bike Shop");
    const addedStock = await sut.createStock(addedShop._id);
    const addedBycicle = await bycicle.add(bycicleData);

    // Act
    const stock = await sut.addBycicleToStock(addedStock._id, addedBycicle._id, 1);

    // Assert
    expect(addedBycicle).not.toBeNull();
    expect(addedBycicle._id).not.toBeNull();

    expect(stock).not.toBeNull();
    expect(stock._id).not.toBeNull();
    expect(stock.shopId).not.toBeNull();
    expect(stock.bycicles).not.toBeNull();
    expect(stock.bycicles.length).toBe(1);
    expect(stock.bycicles[0].bycicle).not.toBeNull();
    expect(stock.bycicles[0].quantity).toBe(1);
    expect(stock.bycicles[0].bycicle._id).not.toBeNull();
    expect(stock.bycicles[0].bycicle._id).toEqual(addedBycicle._id);
  });

  test("Should delete existing stock", async () => {
    // Arrange
    const sut = new StockRepository();
    const shop = new ShopRepository();

    const addedShop = await shop.createShop("Bike Shop");
    const stock = await sut.createStock(addedShop._id);

    // Act
    await sut.delete(stock._id);

        // Assert
        await expect(sut.getById(stock._id)).rejects.toEqual(`No document found with id: ${stock._id}`);

    // Assert
    expect(stock).not.toBeNull();
    expect(stock._id).not.toBeNull();
    expect(stock.shopId).not.toBeNull();
    expect(stock.bycicles).not.toBeNull();
    expect(stock.bycicles.length).toBe(0);
  });
});
