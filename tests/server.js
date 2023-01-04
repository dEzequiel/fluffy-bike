// Test server for integration tests. Each test open new listening port.
// This is not the best approach, but works fine for tests.

const express = require("express");
const cors = require("cors");

const app = express();
const routes = require("../Adapters/routes");

app.use(express.json());
app.use(cors());
app.use(routes);

module.exports = app;
