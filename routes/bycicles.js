const express = require("express");
const controllers = require("../controllers").byciclesController;

const router = express.Router();

// Actually if you pass anything after the /user/ path, eg, /users/anythingHere
// would be matched by the /users/:id route. This is the way Express.js works.
// The routes you define are matched sequentially in the
// order they are defined. Hence,your second routing setup is correct.

/**
 * @openapi
 * /bycicles:
 *   get:
 *     description: Welcome to fluffy bike API!
 *     responses:
 *       200:
 *         description: Returns a hello world message.
 */
router.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

/**
 * @openapi
 * /bycicles/getAll:
 *   get:
 *     description: Endpoint to get all bycicles.
 *     responses:
 *       200:
 *         description: Returns all bycicles.
 */
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

router.get("/brand/:brand", async (req, res) => {
  const brand = req.params.brand;

  const resource = await controllers.bycicleControllerApi.getByBrand(brand);

  const { statusCode, data } = resource;
  return res.status(statusCode).json(data);
});

module.exports = router;
