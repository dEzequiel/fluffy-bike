const { expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../server.js");
const infraestructure = require("../../infraestructure");
const ObjectId = require("mongodb").ObjectId;
const Model = require("../../Domain/models/bycicle.js");
const dataAccess = require("../../Infraestructure/data-access/mongo.bycicles.layer.js");
const services = require("../../Application/services");

// Usage of jest sintaxis
// Assertions occurs inside promise callback
let connection;
describe("Controllers testing", () => {
  beforeAll(async () => {
    await infraestructure.mongoMigrationConfig.connect();
    await infraestructure.mongoMigrationConfig.dropCollection();
  });

  afterAll(async () => {
    await infraestructure.mongoMigrationConfig.disconnect();
  });

  connection = infraestructure.mongoMigrationConfig.getConnection();

  test("GET /skeleton should be Hello World message", async () => {
    // Arrange
    const expected = { message: "Hello World" };

    // Act and assert
    await request(app)
      .get("/skeleton")
      .expect(200)
      .then((res) => {
        // assertions
        expect(res.body).toEqual(expected);
      });
  });

  test("GET /skeleton/:id Should return 200 with plain json objects", async () => {
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
      .spyOn(services.byciclesService.bycicleServiceApi, "getByIdAsync")
      .mockReturnValueOnce(contextObjectUnderTest);

    // Act and assert
    await request(app)
      .get(`/skeleton/${contextObjectUnderTest.id}`)
      .expect(200)
      .then((res) => {
        // assertions
        expect(res.body).toEqual(contextObjectUnderTest);
        expect(getByIdBycicleServiceMock).toHaveBeenLastCalledWith({
          id: "63b1db13b2ade9465c9c5d0d",
        });
      });
  });

  test("GET /skeleton/getAll Should return 200 with list of plain json objects", async () => {
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
      .spyOn(services.byciclesService.bycicleServiceApi, "getAllAsync")
      .mockReturnValueOnce(contextObjectUnderTest);

    // Act and assert
    await request(app)
      .get(`/skeleton/getAll`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(contextObjectUnderTest);
        expect(getAllBycicleServiceMock).toHaveBeenCalled();
      });
  });
});
