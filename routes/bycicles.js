const express = require("express");
const controllers = require("../controllers").byciclesController;

const router = express.Router();

// Actually if you pass anything after the /user/ path, eg, /users/anythingHere
// would be matched by the /users/:id route. This is the way Express.js works.
// The routes you define are matched sequentially in the
// order they are defined.

router.get("/", async (req, res) => {
  res.send({ message: "Hello World" });
});

router.get("/getAll", async (req, res) => {
  const resource = await controllers.bycicleControllerApi.getAll();

  const { statusCode, data } = resource;
  return res.status(statusCode).json(data);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const resource = await controllers.bycicleControllerApi.getById(id);

  const { statusCode, data } = resource;
  return res.status(statusCode).json(data);
});

router.post("/", async (req, res) => {
  const entity = req.body;

  const resource = await controllers.bycicleControllerApi.addBycicle(entity);

  const { statusCode, data } = resource;

  return res.status(statusCode).json(data);
});

router.put("/up/:id", async (req, res) => {
  const id = req.params.id;
  const { fields } = req.body;

  const resource = await controllers.bycicleControllerApi.updateBycicle(
    id,
    fields
  );

  const { statusCode, data } = resource;

  return res.status(statusCode).json(data);
});

router.delete("/del/:id", async (req, res) => {
  const id = req.params.id;

  const resource = await controllers.bycicleControllerApi.deleteBycicle(id);

  const { statusCode, data } = resource;
  return res.status(statusCode).json(data);
});







router.get("/brand/:brand", async (req, res) => {
  const brand = req.params.brand;

  const resource = await controllers.bycicleControllerApi.getByBrand(brand);

  const { statusCode, data } = resource;
  return res.status(statusCode).json(data);
});

module.exports = router;
