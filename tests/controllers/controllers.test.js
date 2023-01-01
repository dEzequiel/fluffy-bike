const { expect } = require("@jest/globals");
const request = require("supertest");
const app = require("./server.js");

// Usage of jest sintaxis
// Assertions occurs inside promise callback
describe("Controllers testing", () => {
  test("GET /skeleton/getAll", async () => {
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
});
