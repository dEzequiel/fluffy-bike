const express = require("express");
const byciclesController = require("../controllers/byciclesController.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

router.get("/:id", byciclesController.bycicleControllerApi.getById);

module.exports = router;
