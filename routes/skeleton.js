const express = require("express");
const { getById } = require("../controllers/byciclesController.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

router.get("/:id", getById);

module.exports = router;
