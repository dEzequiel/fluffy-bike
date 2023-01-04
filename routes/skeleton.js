const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

// Actually if you pass anything after the /user/ path, eg, /users/anythingHere
// would be matched by the /users/:id route. This is the way Express.js works.
// The routes you define are matched sequentially in the
// order they are defined. Hence,your second routing setup is correct.

router.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

router.get("/getAll", async (req, res) => {
  const resource =
    await controllers.byciclesController.bycicleControllerApi.getAll();

  const { statusCode, data } = resource;
  return res.status(statusCode).json(data);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const resource =
    await controllers.byciclesController.bycicleControllerApi.getById(id);

  const { statusCode, data } = resource;
  return res.status(statusCode).json(data);
});

module.exports = router;