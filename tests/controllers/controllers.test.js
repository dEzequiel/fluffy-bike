const { expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../server.js");
const databaseModule = require("../../infraestructure/mongodb.config.js");
const ObjectId = require("mongodb").ObjectId;
const Model = require("../../Domain/models/bycicle.js");
const infraestructure = require("../../Infraestructure/");

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

  test("GET /skeleton/:id should be mongo obj", async () => {
    // Arrange
    const dataUnderTest = new Model({
      _id: ObjectId("63b1db13b2ade9465c9c5d0d"),
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
    });

    await dataUnderTest.save();

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

    // Act and assert
    await request(app)
      .get(`/skeleton/${contextObjectUnderTest.id}`)
      .expect(200)
      .then((res) => {
        // assertions
        console.log(res.body);
        expect(res.body).toEqual(contextObjectUnderTest);
      });
  });
});
