const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const resource =
    await controllers.byciclesController.bycicleControllerApi.getById(id);

  return res.status(200).json(resource);
});

module.exports = router;
