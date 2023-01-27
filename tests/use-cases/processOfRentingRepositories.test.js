const database = require("../../database");
const repositories = require("../../database/data-access");
const models = require("../../domain/models");
const ObjectId = require("mongodb").ObjectId;

let connection;
describe("RentRepository implementation/integration tests", () => {
  beforeAll(async () => {
    await database.mongoDbConfig.connect();
  });

  afterAll(async () => {
    await database.mongoDbConfig.disconnect();
  });

  afterEach(async () => {
    await models.rent.collection.drop();
  });

  connection = database.mongoDbConfig.getConnection();

  test("Should create rent pool when creates a shop.", async () => {
    // Arrange
    const ShopRepository = new repositories.ShopRepository();

    // Act
    const addedShop = await ShopRepository.createShop("Bike Shop");
    const rent = await models.rent.findOne({ shop: addedShop._id });

    // Assert
    console.log(addedShop);
    expect(addedShop).not.toBeNull();
    expect(rent).not.toBeNull();
    expect(rent._id).toBeDefined();
    expect(addedShop.rent).toBeDefined();
    expect(addedShop.rent).toStrictEqual(rent._id);
    expect(rent.shop).toStrictEqual(addedShop._id);
  });

  test("When rent a bike, stock should decrease", async () => {
    // Arrange
    const RentRepository = new repositories.RentRepository();
    const ShopRepository = new repositories.ShopRepository();

    const addedShop = await ShopRepository.createShop("Bike shop");
    const bycicle = new models.bycicle({
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
    bycicle.save();
    await ShopRepository.addBycicleToShop(addedShop._id, bycicle, 3);

    // Act
    await RentRepository.rentBike(addedShop._id, bycicle._id);
    const rents = await RentRepository.getByciclesFilterByRent(
      addedShop._id,
      true
    );
    const stock = await models.stock.findOne({ shop: addedShop._id });

    // Assert
    console.log(rents);
    expect(stock.bycicles[0].quantity).toBe(2);

  });
});
