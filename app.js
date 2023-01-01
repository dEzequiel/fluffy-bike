const databaseModule = require("./infraestructure/mongoConfig.js");
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();
const routes = require("./routes");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

app.use(express.json());
app.use(cors());
app.use(routes);

databaseModule.connect();
