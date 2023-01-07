const { expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../server.js");
const services = require("../../services").byciclesService;
const database = require("../../database");
// Usage of jest sintaxis
// Assertions occurs inside promise callback
describe("Controllers testing", () => {
  beforeAll(async () => {
    await database.mongoMigrationConfig.connect();
  });

  beforeEach(async () => {
    await database.mongoMigrationConfig.dropCollection();
  });

  afterAll(async () => {
    await database.mongoMigrationConfig.disconnect();
  });

  test("GET /skeleton should be Hello World message", async () => {
    // Arrange
    const expected = { message: "Hello World" };

    // Act and assert
    await request(app)
      .get("/bycicles")
      .expect(200)
      .then((res) => {
        // assertions
        expect(res.body).toEqual(expected);
      });
  });

  test("GET /bycicles/:id Should return 200 with plain json object", async () => {
    // Arrange
    const contextObjectUnderTest = {
      id: "63b1db13b2ade9465c9c5d0d",
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

    const getByIdBycicleServiceMock = jest
      .spyOn(services.bycicleServiceApi, "getByIdAsync")
      .mockReturnValueOnce(contextObjectUnderTest);

    // Act and assert
    await request(app)
      .get(`/bycicles/${contextObjectUnderTest.id}`)
      .expect(200)
      .then((res) => {
        // assertions
        expect(res.body).toEqual(contextObjectUnderTest);
        expect(getByIdBycicleServiceMock).toHaveBeenLastCalledWith({
          id: "63b1db13b2ade9465c9c5d0d",
        });
      });
  });

  test("GET /bycicles/getAll Should return 200 with list of plain json objects", async () => {
    // Arrange
    const contextObjectUnderTest = [
      {
        id: "63b1db13b2ade9465c9c5d0d",
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
      },
      {
        id: "63b1db3211c382e5701713d0",
        name: "Commuter Classic",
        brand: "CUBE",
        price: 749.99,
        type: "Urban",
        frame: "Steel",
        fork: "Enduro",
        gears: "Internal gear hub",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Commuter tires",
        suspension: "Rigid",
        weight: 9.5,
        available: true,
      },
    ];

    const getAllBycicleServiceMock = jest
      .spyOn(services.bycicleServiceApi, "getAllAsync")
      .mockReturnValueOnce(contextObjectUnderTest);

    // Act and assert
    await request(app)
      .get(`/bycicles/getAll`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(contextObjectUnderTest);
        expect(getAllBycicleServiceMock).toHaveBeenCalled();
      });
  });
});
