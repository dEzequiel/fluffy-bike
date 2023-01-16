const database = require("../../database");
const ShopModel = require("../../domain/models/shop.js");
const StockModel = require("../../domain/models/stock.js");
const BycicleModel = require("../../domain/models/bycicle.js");
const RentModel = require("../../domain/models/rent.js");
const ObjectId = require("mongodb").ObjectId;
const Repository = require("../../database/data-access/Repository.js");
const ShopRepository = require("../../database/data-access/ShopRepository.js");
const BycicleRepository = require("../../database/data-access/BycicleRepository.js");
const StockRepository = require("../../database/data-access/StockRepository.js");
const RentRepository = require("../../database/data-access/RentRepository.js");
const rent = require("../../domain/models/rent.js");

describe("StockRepository should override prototype chain inherit methods from Repository", () => {
  test("StockRepository dont have own methods, they are inherit from prototype", () => {
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
describe("StockRepository implementation/integration tests", () => {
  beforeAll(async () => {
    await database.mongoDbConfig.connect();
  });

  afterAll(async () => {
    await database.mongoDbConfig.disconnect();
  });

  afterEach(async () => {
    await RentModel.collection.drop();
  });

  connection = database.mongoDbConfig.getConnection();

  test("Should create a pool of rents for a shop", async () => {
    // Arrange
    const sut = new RentRepository();
    const shop = new ShopRepository();

    const addedShop = await shop.createShop("Bike Shop");

    // Act
    const result = await sut.createRentPool(addedShop._id);

    // Assert
    expect(result).not.toBeNull();
    expect(result._id).not.toBeNull();
    expect(result.shop).not.toBeNull();
    expect(result.bycicles).not.toBeNull();
    expect(result.bycicles.length).toBe(0);
  });

  test("Should reject promise when try to create a rent pool for a shop that don't exists", async () => {
    // Arrange
    const sut = new RentRepository();
    const inexistentShopId = ObjectId("63c489cb76957a904587cb3a");

    // Act
    await expect(sut.createRentPool(inexistentShopId)).rejects.toThrowError(
      "Shop doesn't exist"
    );
  });

  test("Should add a rent option to pool of rents", async () => {
    // Arrange
    const sut = new RentRepository();
    const shop = new ShopRepository();
    const bycicle = new BycicleRepository();
    const stock = new StockRepository();

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

    const addedShop = await shop.createShop("Bike Shop");
    const addedStock = await stock.createStock(addedShop._id);
    const addedBycicle = await bycicle.add(bycicleData);
    const addedRentPool = await sut.createRentPool(addedShop._id);

    // Act
    const result = await sut.addByciclesToRentPool(
      addedShop._id,
      addedBycicle._id,
      true
    );
    // Assert
    expect(result).not.toBeNull();
    expect(result._id).not.toBeNull();
    expect(result.shop).not.toBeNull();
    expect(result.bycicles).not.toBeNull();
    expect(result.bycicles.length).toBe(1);
  });

  test("Should update available status to false when a bycicle is rented", async () => {
    // Arrange
    const sut = new RentRepository();
    const shop = new ShopRepository();
    const bycicle = new BycicleRepository();
    const stock = new StockRepository();

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

    const addedShop = await shop.createShop("Bike Shop");
    const addedStock = await stock.createStock(addedShop._id);
    const addedBycicle = await bycicle.add(bycicleData);

    // Add bycicle to stock with available status true
    // and total bycicles 2
    await stock.addBycicleToStock(addedStock._id, addedBycicle._id, 2);

    await sut.createRentPool(addedShop._id);
    await sut.addByciclesToRentPool(addedShop._id, addedBycicle._id, true);

    // Act
    const result = await sut.rentBike(addedShop._id, addedBycicle._id);

    // Assert
    expect(result).not.toBeNull();
    expect(result.shopId).not.toBeNull();
    expect(result.bycicles).not.toBeNull();
    expect(result.bycicles.length).toBe(1);
    expect(result.bycicles[0].available).toBe(false);
  });

  test("Should update available status to true when a bycicle is unreted", async () => {
    // Arrange
    const sut = new RentRepository();
    const shop = new ShopRepository();
    const bycicle = new BycicleRepository();
    const stock = new StockRepository();

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

    const addedShop = await shop.createShop("Bike Shop");
    const addedStock = await stock.createStock(addedShop._id);
    const addedBycicle = await bycicle.add(bycicleData);

    // Add bycicle to stock with available status true
    // and total bycicles 2
    await stock.addBycicleToStock(addedStock._id, addedBycicle._id, 2);

    await sut.createRentPool(addedShop._id);
    await sut.addByciclesToRentPool(addedShop._id, addedBycicle._id, true);

    // Act
    const result = await sut.unrentBike(addedShop._id, addedBycicle._id);

    // Assert
    expect(result).not.toBeNull();
    expect(result.shopId).not.toBeNull();
    expect(result.bycicles).not.toBeNull();
    expect(result.bycicles.length).toBe(1);
    expect(result.bycicles[0].available).toBe(true);
  });

  test("Should return a list of bycicles rented by a shop", async () => {
    // Arrange
    const sut = new RentRepository();
    const shop = new ShopRepository();
    const bycicle = new BycicleRepository();
    const stock = new StockRepository();

    const bycicleData = [
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

    const addedShop = await shop.createShop("Bike Shop");
    const addedStock = await stock.createStock(addedShop._id);
    const addedBycicle = await bycicle.add(bycicleData[0]);
    const addedBycicle2 = await bycicle.add(bycicleData[1]);

    // Add bycicle to stock with available status true
    // and total bycicles 2
    await stock.addBycicleToStock(addedStock._id, addedBycicle._id, 2);
    await stock.addBycicleToStock(addedStock._id, addedBycicle2._id, 2);

    await sut.createRentPool(addedShop._id);
    await sut.addByciclesToRentPool(addedShop._id, addedBycicle._id, true);
    await sut.addByciclesToRentPool(addedShop._id, addedBycicle2._id, true);

    await sut.rentBike(addedShop._id, addedBycicle._id);

    // Act
    const result = await sut.getByciclesFilterByRent(addedShop._id, false);
    const rentPool = await sut.getRentPool(addedShop._id);

    // Assert
    console.log(result);
    expect(rentPool).not.toBeNull();
    expect(rentPool.bycicles.length).toBe(2);

    expect(result).not.toBeNull();
    expect(result.bycicles.length).toBe(1);
    result.bycicles.forEach((element) => {
      expect(element.available).toBe(false);
    });
  });

  test("Should return a list of bycicles available for rent by a shop", async () => {
    // Arrange
    const sut = new RentRepository();
    const shop = new ShopRepository();
    const bycicle = new BycicleRepository();
    const stock = new StockRepository();

    const bycicleData = [
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

    const addedShop = await shop.createShop("Bike Shop");
    const addedStock = await stock.createStock(addedShop._id);
    const addedBycicle = await bycicle.add(bycicleData[0]);
    const addedBycicle2 = await bycicle.add(bycicleData[1]);

    // Add bycicle to stock with available status true
    // and total bycicles 2
    await stock.addBycicleToStock(addedStock._id, addedBycicle._id, 2);
    await stock.addBycicleToStock(addedStock._id, addedBycicle2._id, 2);

    await sut.createRentPool(addedShop._id);
    await sut.addByciclesToRentPool(addedShop._id, addedBycicle._id, true);
    await sut.addByciclesToRentPool(addedShop._id, addedBycicle2._id, true);

    await sut.rentBike(addedShop._id, addedBycicle._id);

    // Act
    const result = await sut.getByciclesFilterByRent(addedShop._id, true);
    const rentPool = await sut.getRentPool(addedShop._id);

    // Assert
    console.log(result);
    expect(rentPool).not.toBeNull();
    expect(rentPool.bycicles.length).toBe(2);

    expect(result).not.toBeNull();
    expect(result.bycicles.length).toBe(1);
    result.bycicles.forEach((element) => {
      expect(element.available).toBe(true);
    });
  });
});
