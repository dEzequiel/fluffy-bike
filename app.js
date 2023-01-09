const express = require("express");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

var app = express();
console.log("Express app running...");

app.use(express.json());

const cors = require("cors");
app.use(cors());

const routes = require("./routes");
app.use(routes);

const swaggerDocument = YAML.load("api-doc.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const mongoConnection = require("./database/mongodb.config.js");
mongoConnection.connect();

module.exports = app;
