const mongoose = require("mongoose");
const databaseModule = require("../infraestructure/mongoConfig.js");
const { expect } = require("@jest/globals");
const Model = require("../models/nosql/bycicle.js");

describe("Mongoose testing", () => {
  let connection;
  let db;
  const model = require("../models/nosql/bycicle.js");
  model.collection = "Testing";

  beforeAll(async () => {
    connection = await databaseModule.connect();
    db = databaseModule.getDb();
  });

  afterAll(async () => {
    await db.close();
  });

  test("Should stay connecting to database", async () => {
    expect(db.readyState).toEqual(2);
  });

  test("Model should use testing collection", () => {
    expect(model.collection).toEqual("Testing");
  });

  test("Model should use db connection object", () => {
    expect(model.db).toBe(db);
  });

  // test("Should know how many documents exists in collection",  () => {
  //   expect(model.estimatedDocumentCount().count()).toEqual(6);
  // });
  test("Should insert new document", () => {
    const doc = new Model({
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

    model.create(doc);

    expect(doc._id).toBeDefined();
  });
});
