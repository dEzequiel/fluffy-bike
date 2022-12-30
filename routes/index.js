const express = require("express");
const router = express.Router();
const fs = require("fs");
const PATH_ROUTER = __dirname;

const cleanFilename = (filename) => {
  return filename.split(".").shift();
};

fs.readdirSync(PATH_ROUTER).filter((filename) => {
  const name = cleanFilename(filename);
  if (name !== "index") {
    console.log(`Loading route... /${name}`);
    router.use(`/${name}`, require(`./${filename}`));
  }
});

module.exports = router;
