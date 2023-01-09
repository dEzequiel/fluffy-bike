const { expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../server.js");
const services = require("../../services").byciclesService;
const database = require("../../database");
const repository = require("../../database/data-access/BycicleRepository.js");
const BycicleRepository = require("../../database/data-access/BycicleRepository.js");

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
      .expect("Content-Type", /json/)
      .then((res) => {
        // assertions
        expect(res.body).toEqual(expected);
      });
  });

  test("GET /bycicles/:id Should return 200 with plain json object", async () => {
    // Arrange
    const repository = new BycicleRepository();
    const contextObjectUnderTest = {
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

    const addedEntity = await repository.add(contextObjectUnderTest);

    const serviceResponse = await services.bycicleServiceApi.getByIdAsync(
      addedEntity._id
    );

    // Act and assert
    await request(app)
      .get(`/bycicles/${addedEntity._id}`)
      .expect(200)
      .then((res) => {
        // assertions
        expect(res.body).toEqual(serviceResponse);
        // expect(getByIdBycicleServiceMock).toHaveBeenLastCalledWith({
        //   id: "63b1db13b2ade9465c9c5d0d",
        // });
      });
  });

  test("GET /bycicles/getAll Should return 200 with list of plain json objects", async () => {
    // Arrange
    const repository = new BycicleRepository();
    const dataUnderTest = [
      {
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
        name: "Roadster Elite",
        brand: "All City",
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
    ];
    await repository.addMany(dataUnderTest);
    const serviceResponse = await services.bycicleServiceApi.getAllAsync();

    // Act and assert
    await request(app)
      .get(`/bycicles/getAll`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(serviceResponse);
      });
  });

  test("GET /bycicles/brand/:brand Should return 200 with list of plain json objects", async () => {
    // Arrange
    const repository = new BycicleRepository();
    const dataUnderTest = [
      {
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
        name: "Roadster Elite",
        brand: "All City",
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
    ];
    await repository.addMany(dataUnderTest);
    const brand = "Argon 18";
    const serviceResponse = await services.bycicleServiceApi.getByBrandAsync(
      "Argon 18"
    );

    // Act & assert
    await request(app)
      .get(`/bycicles/brand/${brand}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toEqual(serviceResponse);
      });
  });

  test("POST /bycicles Should return 201 with created entity", async () => {
    // Arrange
    const dataUnderTest = {
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

    // Act & assert
    await request(app)
      .post(`/bycicles`)
      .send(dataUnderTest)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body).toEqual(expect.objectContaining(dataUnderTest));
      });
  });
});
