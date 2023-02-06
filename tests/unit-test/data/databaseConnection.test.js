const database = require("../../../database").mongoDb;
const { expect } = require("@jest/globals");

let connection;
describe("Mongoose MongoDB connection testing", () => {
  beforeAll(async () => {
    await database.connect();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  connection = database.getConnection();

  test("Should connect to database", async () => {
    expect(connection.readyState).toEqual(1);
  });
});

test("Should disconnect from database", () => {
  expect(connection.readyState).toEqual(0);
  // Outside describe() because it's neede to run afterAll().
});
