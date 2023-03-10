const database = require("../../database");
const ShopModel = require("../../domain/models/shop.js");
const BycicleModel = require("../../domain/models/bycicle.js");
const ObjectId = require("mongodb").ObjectId;
const Repository = require("../../database/data-access/Repository.js");
const ShopRepository = require("../../database/data-access/ShopRepository.js");
const BycicleRepository = require("../../database/data-access/BycicleRepository.js");

describe("ShopRepository should override prototype chain inherit methods from Repository", () => {
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

  test("ShopRepository dont have own methods, they are inherit from prototype", () => {
    // Arrange
    const sut = new ShopRepository();

    // Assert
    expect(sut.hasOwnProperty("getAll")).toBeFalsy();
    expect(sut.hasOwnProperty("getById")).toBeFalsy();
    expect(sut.hasOwnProperty("add")).toBeFalsy();
    expect(sut.hasOwnProperty("update")).toBeFalsy();
    expect(sut.hasOwnProperty("delete")).toBeFalsy();
  });

  test("ShopRepository prototype has own prototype methods implementation", () => {
    // Arrange
    const sut = new ShopRepository();

    // Assert
    expect(sut.__proto__.hasOwnProperty("createShop")).toBeTruthy();
  });
});

let connection;
describe("ShopRepository implementation/integration tests", () => {
  beforeAll(async () => {
    await database.mongoDbConfig.connect();
  });

  afterAll(async () => {
    await database.mongoDbConfig.disconnect();
  });

  afterEach(async () => {
    await ShopModel.collection.drop();
  });

  connection = database.mongoDbConfig.getConnection();
  //   test("Model should use testing collection", async () => {
  //     expect(ShopModel.collection.collectionName).toEqual("Shop-Testing");
  //   });

  test("Should create new shop with empty bycicles stock", async () => {
    // Arrange
    const sut = new ShopRepository();

    // Act
    const result = await sut.createShop("Shop1-Test");

    // Assert
    expect(result).not.toBeNull();
    expect(result._id).not.toBeNull();
    expect(result._id).not.toBeUndefined();
    expect(result.name).not.toBeNull();
    expect(result.name).not.toBeUndefined();
    expect(result.name).toBe("Shop1-Test");
    expect(result.bycicles).not.toBeNull();
    expect(result.bycicles).not.toBeUndefined();
    expect(result.bycicles.length).toBe(0);
  });

  test("Should delete shop", async () => {
    // Arrange
    const sut = new ShopRepository();
    const addedShop = await sut.createShop("Bike Shop");

    // Act
    await sut.delete(addedShop._id);

    // Assert
    await expect(sut.getById(addedShop._id)).rejects.toEqual(`No document found with id: ${addedShop._id}`);
  })

  test("Should add existing bycicle to shop", async () => {
    // Arrange
    const sut = new ShopRepository();
    const addedBycicle = new BycicleModel({
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

    // Act
    const addedShop = await sut.createShop("Shop2-Test");
    const result = await sut.addBycicleToShop(addedShop._id, addedBycicle._id);

    // Assert
    expect(addedBycicle._id).not.toBeNull();
    expect(addedBycicle).not.toBeNull();
    expect(addedBycicle._id).not.toBeUndefined();

    expect(addedShop._id).not.toBeNull();
    expect(addedShop).not.toBeNull();
    expect(addedShop._id).not.toBeUndefined();

    expect(result).not.toBeNull();
    expect(result.name).toBe("Shop2-Test");
    expect(result.bycicles.length).toBe(1);
  });

  test("Should retrieve shop with bycicle information", async () => {
    // Arrange
    const sut = new ShopRepository();
    const addedBycicle = new BycicleModel({
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
    await addedBycicle.save();

    const addedShop = await sut.createShop("Shop3-Test");
    await sut.addBycicleToShop(addedShop._id, addedBycicle._id);

    // Act
    const result = await sut.getStock(addedShop._id);

    // Assert
    expect(result).not.toBeNull();
    expect(result._id).not.toBeNull();
    expect(result._id).not.toBeUndefined();
    expect(result.name).toBe("Shop3-Test");

    expect(result.bycicles).not.toBeNull();
    expect(result.bycicles).not.toBeUndefined();
    expect(result.bycicles.length).toBe(1);
    expect(result.bycicles[0]._id).not.toBeNull();
    expect(result.bycicles[0]._id).not.toBeUndefined();
    expect;
  });

  // test("Should delete shop and associated bycicles", async () => {
  //   // Arrange
  //   const sut = new ShopRepository();
  //   const addedBycicle = new BycicleModel({
  //     _id: ObjectId("63b859b14552d7ff361a5be5"),
  //     name: "Roadster Elite",
  //     brand: "Argon 18",
  //     price: 1299.99,
  //     type: "Road",
  //     frame: "Carbon",
  //     fork: "XC",
  //     gears: "Derailleur gears",
  //     brakes: "Hydraulic Disc",
  //     wheels: "700c",
  //     tires: "Road tires",
  //     suspension: "Hardtail",
  //     weight: 7.5,
  //     available: true,
  //   });
  //   await addedBycicle.save();
  //   const addedShop = await sut.createShop("Bike Shop");
  //   await sut.addBycicleToShop(addedShop._id, addedBycicle._id);
  //   const expectedMessage = (id) => `No document found with id: ${id}`;

  //   // Act
  //   await sut.delete(addedShop._id);
  //   const bycicle = await BycicleModel.findById(addedBycicle._id);

  //   // Assert
  //   await expect(sut.getById(addedShop._id)).rejects.toEqual(expectedMessage(addedShop._id));
  //   expect(bycicle).toBeNull();
    
  // });

  // test("Should retrieve shop with available stock", async () => {
  //   // Arrange
  //   const sut = new ShopRepository();
  //   const addedShop = await sut.createShop("Shop3-Test");
  //   const dataUnderTest = [
  //     new BycicleModel({
  //       _id: ObjectId("63b859b14552d7ff361a5be5"),
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
  //       available: false,
  //     }),
  //     new BycicleModel({
  //       _id: ObjectId("63b85961c2ad6d4b9048f7e1"),
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
  //   await BycicleModel.insertMany(dataUnderTest);

  //   await sut.addBycicleToShop(addedShop._id, dataUnderTest[0]._id);
  //   await sut.addBycicleToShop(addedShop._id, dataUnderTest[1]._id);

  //   // Act
  //   const result = await sut.getAvailableStock(addedShop._id);

  //   // Assert
  //   expect(result).not.toBeNull();
  //   expect(result._id).not.toBeNull();
  //   expect(result._id).not.toBeUndefined();
  //   expect(result.bycicles.length).toBe(1);
  // });

  // test("Should return empty array because population was empty", async () => {
  //   // Arrange
  //   const sut = new ShopRepository();
  //   const addedShop = await sut.createShop("Shop3-Test");

  //   // Act
  //   const result = await sut.getStock(addedShop._id);

  //   // Assert
  //   expect(result).not.toBeNull();
  //   expect(result._id).not.toBeNull();
  //   expect(result._id).not.toBeUndefined();
  //   expect(result.name).toBe("Shop3-Test");

  //   expect(result.bycicles).not.toBeNull();
  //   expect(result.bycicles).not.toBeUndefined();
  //   expect(result.bycicles.length).toBe(0);
  // });
});
