const { expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../server.js");
const services = require("../../services").byciclesService;

// Usage of jest sintaxis
// Assertions occurs inside promise callbacks.
describe("Controllers testing", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("GET /bycicles should be Hello World message", async () => {
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
    const contextObjectUnderTest = {
      id: "63bd86efc9bc406f706a1994",
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
    };

    const serviceResponseMock = jest
      .spyOn(services.bycicleServiceApi, "getByIdAsync")
      .mockImplementation(() => {
        return contextObjectUnderTest;
      });

    // Act and assert
    await request(app)
      .get(`/bycicles/${contextObjectUnderTest.id}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        // assertions
        expect(res.body).toEqual(contextObjectUnderTest);
        expect(serviceResponseMock).toHaveBeenLastCalledWith({
          id: contextObjectUnderTest.id,
        });
      });
  });

  test("GET /bycicles/:id Should return 404", async () => {
    // Arrange
    const id = "63bd8e461ed4635c9baff420";
    const serviceResponseMock = jest
      .spyOn(services.bycicleServiceApi, "getByIdAsync")
      .mockImplementation(() => {
        return null;
      });

    // Act and assert
    await request(app)
      .get(`/bycicles/${id}`)
      .expect(404)
      .expect("Content-Type", /json/);
    expect(serviceResponseMock).toHaveBeenLastCalledWith({ id: id });
  });

  test("GET /bycicles/getAll Should return 200 with list of plain json objects", async () => {
    // Arrange
    const contextObjectUnderTest = [
      {
        id: "63bd886ddfff5d7ac2f98e0d",
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
      },
      {
        id: "63bd8873fc177691f5c10f0d",
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
      },
      {
        id: "63bd888f6d6b2deddb2a53b5",
        name: "Roadster Elite",
        brand: "All City",
        type: "Road",
        frame: "Carbon",
        fork: "XC",
        gears: "Derailleur gears",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Road tires",
        suspension: "Hardtail",
        weight: 7.5,
      },
    ];

    const serviceResponseMock = jest
      .spyOn(services.bycicleServiceApi, "getAllAsync")
      .mockImplementation(() => {
        return contextObjectUnderTest;
      });

    // Act and assert
    await request(app)
      .get(`/bycicles/getAll`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toEqual(contextObjectUnderTest);
        expect(serviceResponseMock).toHaveBeenCalled();
      });
  });

  test("GET /bycicles/brand/:brand Should return 404", async () => {
    // Arrange
    const brand = "Argon 18";
    const serviceResponseMock = jest
      .spyOn(services.bycicleServiceApi, "getByBrandAsync")
      .mockImplementation(() => {
        return null;
      });

    // Act & assert
    await request(app)
      .get(`/bycicles/brand/${brand}`)
      .expect(404)
      .expect("Content-Type", /json/);
    expect(serviceResponseMock).toHaveBeenLastCalledWith(brand);
  });

  test("GET /bycicles/brand/:brand Should return 200 with list of plain json objects", async () => {
    // Arrange
    const contextObjectUnderTest = [
      {
        id: "63bd886ddfff5d7ac2f98e0d",
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
      },
      {
        id: "63bd8873fc177691f5c10f0d",
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
      },
      {
        id: "63bd888f6d6b2deddb2a53b5",
        name: "Roadster Elite",
        brand: "All City",
        type: "Road",
        frame: "Carbon",
        fork: "XC",
        gears: "Derailleur gears",
        brakes: "Hydraulic Disc",
        wheels: "700c",
        tires: "Road tires",
        suspension: "Hardtail",
        weight: 7.5,
      },
    ];
    const brand = "Argon 18";

    let expectedResult;
    const serviceResponseMock = jest
      .spyOn(services.bycicleServiceApi, "getByBrandAsync")
      .mockImplementation(() => {
        expectedResult = [contextObjectUnderTest[0], contextObjectUnderTest[1]];
        return expectedResult;
      });

    // Act & assert
    await request(app)
      .get(`/bycicles/brand/${brand}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toEqual(expectedResult);
        expect(res.body.length).toBe(2);
        res.body.forEach((doc) => {
          expect(doc.brand).toEqual(brand);
        });
        expect(serviceResponseMock).toHaveBeenLastCalledWith(brand);
      });
  });

  test("POST /bycicles Should return 201 with created entity", async () => {
    // Arrange
    const dataUnderTest = {
      id: "63bd886ddfff5d7ac2f98e0d",	
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
    };

    const serviceResponseMock = jest
      .spyOn(services.bycicleServiceApi, "addAsync")
      .mockImplementation(() => {
        return dataUnderTest;
      });

    // Act & assert
    await request(app)
      .post(`/bycicles`)
      .send(dataUnderTest)
      .set('Accept', 'application/json')
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body).toEqual(expect.objectContaining(dataUnderTest));
        expect(serviceResponseMock).toHaveBeenCalledWith(dataUnderTest);
      });
  });

  test("POST /bycicles Should return 500 ", async () => {
    // Arrange
    const serviceResponseMock = jest
      .spyOn(services.bycicleServiceApi, "addAsync")
      .mockImplementation(() => {
        return null;
      });

    // Act & assert
    await request(app)
      .post(`/bycicles`)
      .send(null)
      .expect(500)
      .expect("Content-Type", /json/);
    expect(serviceResponseMock).toHaveBeenCalledWith({});
  });

  test("DELETE /bycicles Should return 200 with delated entity", async () => {
    // Arrange
    const contextObjectUnderTest = {
      id: "63bd886ddfff5d7ac2f98e0d",
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
    };

    const serviceResponseMock = jest
      .spyOn(services.bycicleServiceApi, "deleteAsync")
      .mockImplementation(() => {
        return contextObjectUnderTest;
      });

    // Act & assert
    await request(app)
      .delete(`/bycicles/del/${contextObjectUnderTest.id}`)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(serviceResponseMock).toHaveBeenCalledWith(contextObjectUnderTest.id);
  });

  // test("DELETE /bycicles Should return 404", async () => {
  //   // Arrange
  //   const id = "63bd95a4c1f68f3c38956c21";
  //   const serviceResponseMock = jest
  //     .spyOn(services.bycicleServiceApi, "deleteAsync")
  //     .mockImplementation(() => {
  //       return null;
  //     });

  //   // Act & assert
  //   await request(app)
  //     .delete(`/bycicles/id/${id}`)
  //     .expect(404)
  //     .expect("text/plain");
  //   expect(serviceResponseMock).toBeCalled();
  // });
});
