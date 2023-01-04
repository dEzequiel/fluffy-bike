const databaseModule = require("./infraestructure/mongodb.config.js");

//https://stackoverflow.com/questions/46515764/how-can-i-use-async-await-at-the-top-level
(async () => {
  try {
    const database = await databaseModule.connect();
  } catch (e) {
    console.log(e);
    // Deal with the fact the chain failed
  }
  // `Database` is not available here
})();
const express = require("express");
var app = express();
console.log("Express app running...");

app.use(express.json());

const cors = require("cors");
app.use(cors());

const routes = require("./Adapters/routes");
app.use(routes);

module.exports = app;
