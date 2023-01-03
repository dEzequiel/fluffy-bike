const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

router.get("/:id", controllers.byciclesController.bycicleControllerApi.getById);

module.exports = router;
