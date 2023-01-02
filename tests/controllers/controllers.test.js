const { expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../server.js");
const databaseModule = require("../../infraestructure/mongoConfig.js");

// Usage of jest sintaxis
// Assertions occurs inside promise callback
describe("Controllers testing", () => {
  beforeEach(async () => {
    await databaseModule.connect();
  });

  afterEach(async () => {
    await databaseModule.disconnect();
  });

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
    const expected = {
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
      .get(`/skeleton/${expected.id}`)
      .expect(200)
      .then((res) => {
        // assertions
        console.log(res.body);
        expect(res.body).toEqual(expected);
      });
  });
});
