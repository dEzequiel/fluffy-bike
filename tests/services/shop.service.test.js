const database = require("../../database/");
const ShopModel = require("../../domain/models/shop.js");
const BycicleModel = require("../../domain/models/bycicle.js");
const services = require("../../services").shopService;
const ObjectId = require("mongodb").ObjectId;
const { expect } = require("@jest/globals");
const ShopRepository = require("../../database/data-access/ShopRepository.js");

let connection;
describe("Shop service testing", () => {
  beforeAll(async () => {
    await database.mongoMigrationConfig.connect();
  });

  afterEach(async () => {
    await database.mongoMigrationConfig.dropCollection();
  });

  afterAll(async () => {
    await database.mongoMigrationConfig.disconnect();
  });

  connection = database.mongoMigrationConfig.getConnection();
  const repository = new ShopRepository();

  describe("Connection testing", () => {
    test("Should connect to database and use correct testing collection", async () => {
      expect(connection.readyState).toEqual(1); // Status connected. Not connecting, is different.
      expect(ShopModel.collection.collectionName).toEqual("Shop-Testing");
    });
  });

  describe("Shop service public api integration testing", () => {
    test("Should create shop as POJO", async () => {
      // Arrange
      const expectedShopObject = {
        name: "Bike Shop",
        bycicles: [],
      };

      // Act
      const result = await services.shopServiceApi.addAsync("Bike Shop");
      expectedShopObject.id = result.id;

      // Assert
      expect(result).not.toBeNull();
      console.log(result);
      expect(result).toEqual(expectedShopObject);
    });
    test("Should return shop as POJO", async () => {
      // Arrange
      const expectedShopObject = {
        name: "Bike Shop",
        bycicles: [],
      };
      const addedShop = await services.shopServiceApi.addAsync("Bike Shop");

      // Act
      expectedShopObject.id = addedShop.id;
      const result = await services.shopServiceApi.getByIdAsync(addedShop.id);
      console.log(result)
      // Assert
      expect(result).not.toBeNull();
      expect(result).toEqual(expectedShopObject);
    });
    
    // test("Should return shop with stock as js plain obbject", async () => {
    //   // Arrange
    //   const shop = {
    //     name: "Bike Shop",
    //     bycicles: [
    //       {
    //         bycicleId: "5f9a1f1b6a2a2c0a8c9d9e0f",
    //       },
    //       {
    //         bycicleId: "5f9a1f1b6a2a2c0a8c9d9e10",
    //       },
    //       {
    //         bycicleId: "5f9a1f1b6a2a2c0a8c9d9e11",
    //       },
    //     ],
    //   };
    //   const byciclesCollection = [
    //     new BycicleModel({
    //       _id: ObjectId("5f9a1f1b6a2a2c0a8c9d9e0f"),
    //       name: "Roadster Elite",
    //       brand: "Argon 18",
    //       price: 1299.99,
    //       type: "Road",
    //       frame: "Carbon",
    //       fork: "XC",
    //       gears: "Derailleur gears",
    //       brakes: "Hydraulic Disc",
    //       wheels: "700c",
    //       tires: "Road tires",
    //       suspension: "Hardtail",
    //       weight: 7.5,
    //       available: true,
    //     }),
    //     new BycicleModel({
    //       _id: ObjectId("5f9a1f1b6a2a2c0a8c9d9e11"),
    //       name: "Roadster Elite",
    //       brand: "Argon 18",
    //       price: 1299.99,
    //       type: "Road",
    //       frame: "Carbon",
    //       fork: "XC",
    //       gears: "Derailleur gears",
    //       brakes: "Hydraulic Disc",
    //       wheels: "700c",
    //       tires: "Road tires",
    //       suspension: "Hardtail",
    //       weight: 7.5,
    //       available: true,
    //     }),
    //     new BycicleModel({
    //       _id: ObjectId("5f9a1f1b6a2a2c0a8c9d9e10"),
    //       name: "Roadster Elite",
    //       brand: "Argon 18",
    //       price: 1299.99,
    //       type: "Road",
    //       frame: "Carbon",
    //       fork: "XC",
    //       gears: "Derailleur gears",
    //       brakes: "Hydraulic Disc",
    //       wheels: "700c",
    //       tires: "Road tires",
    //       suspension: "Hardtail",
    //       weight: 7.5,
    //       available: true,
    //     }),
    //   ];

    //   const addedShop = await repository.add(shop);
    //   await BycicleModel.insertMany(byciclesCollection);

    //   const shopExpectedObject = {
    //     id: addedShop._id.toString(),
    //     name: "Bike Shop",
    //     bycicles: [
    //       {
    //         bycicleId: "5f9a1f1b6a2a2c0a8c9d9e0f",
    //       },
    //       {
    //         bycicleId: "5f9a1f1b6a2a2c0a8c9d9e10",
    //       },
    //       {
    //         bycicleId: "5f9a1f1b6a2a2c0a8c9d9e11",
    //       },
    //     ],
    //   };
    //   // Act
    //   const result = await services.getStock(addedShop._id);

    //   // Assert
    //   expect(result).not.toBeNull();
    //   expect(result).not.toBeUndefined();
    // });
  });
});
