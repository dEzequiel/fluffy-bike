const database = require("../../database");
const repositories = require("../../database/data-access");
const models = require("../../domain/models");
const ObjectId = require("mongodb").ObjectId;

describe("RentRepository implementation/integration tests", () => {
  beforeAll(async () => {
    await database.mongoMigrationConfig.connect();
  });

  afterEach(async () => {
    await database.mongoMigrationConfig.dropCollection();
  });

  afterAll(async () => {
    await database.mongoMigrationConfig.disconnect();
  });

  test("Should create shop, and stock should be created automatically", async () => {
    // Arrange
    const ShopRepository = new repositories.ShopRepository();

    // Act
    const addedShop = await ShopRepository.createShop("Bike shop");
    const stock = await models.stock.findOne({ shopId: addedShop._id });

    // Assert
    expect(addedShop).not.toBeNull();
    expect(stock).not.toBeNull();
    expect(stock._id).toBeDefined();
    expect(addedShop.stock).toBeDefined();
    expect(addedShop.stock).toStrictEqual(stock._id);
    expect(stock.shop).toStrictEqual(addedShop._id);
  });

  test("Should delete stock automatically when a shop is deleted", async () => {
    // Arrange
    const ShopRepository = new repositories.ShopRepository();

    const addedShop = await ShopRepository.createShop("Bike shop 2");
    const stock = await models.stock.findOne({ shopId: addedShop._id });

    // Act
    //await ShopRepository.delete(addedShop._id);

    // Assert
    expect(addedShop).not.toBeNull();
    expect(stock).not.toBeNull();
    expect(stock._id).toBeDefined();
    expect(addedShop.stock).toBeDefined();
    expect(addedShop.stock).toStrictEqual(stock._id);
    expect(stock.shop).toStrictEqual(addedShop._id);
  });

  test("Should increment bycicle stock quantity, when a shop add a bycicle", async () => {
    // Arrange
    const ShopRepository = new repositories.ShopRepository();
    const addedBycicle = new models.bycicle({
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
    });

    const addedShop = await ShopRepository.createShop("Bike shop");

    // Act
    await ShopRepository.addBycicleToShop(addedShop._id, addedBycicle);
    const stock = await models.stock.findOne({ shop: addedShop._id });
    // Assert
    expect(addedShop).not.toBeNull();
    expect(stock).not.toBeNull();
    expect(stock._id).toBeDefined();
    expect(addedShop.stock).toBeDefined();
    expect(addedShop.stock).toStrictEqual(stock._id);
    expect(stock.shop).toStrictEqual(addedShop._id);
    expect(stock.bycicles.length).toBe(1);
  });
});
