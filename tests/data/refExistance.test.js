const ObjectId = require("mongodb").ObjectId;
const ShopRepository = require("../../database/data-access/ShopRepository.js");
const refExistance = require("../../utils/refExistance");
const database = require("../../database");

describe("refExistance", () => {
  beforeAll(async () => {
    await database.mongoDbConfig.connect();
  });

  afterAll(async () => {
    await database.mongoDbConfig.disconnect();
  });

  afterEach(async () => {});

  connection = database.mongoDbConfig.getConnection();
  it("should return true if shop exist", async () => {
    // Arrange
    const shop = new ShopRepository();
    const addedShop = await shop.createShop("Bike Shop");

    // Act
    const result = refExistance.shopExist(addedShop._id);

    // Assert
    result.then((res) => {
      expect(res).toBe(true);
    });
  });

  it("should return false if shop doesn't exist", async () => {
    // Arrange
    const shopId = ObjectId("5f7b9e1e1c9d440000b2e2e4");

    // Act
    const result = await refExistance.shopExist(shopId);

    // Assert
    expect(result).toBe(false);
  });
});
