const databaseModule = require("./infraestructure/mongoConfig.js");
const express = require("express");
const cors = require("cors");
const Model = require("./models/nosql/bycicle.js");

const port = process.env.PORT || 3000;
var app = express();
const routes = require("./routes");

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

// `Database` is not available here, either, and code here is reached before the promise settles
// and before the code after `await` in the main function above runs
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(cors());
app.use(routes);

module.exports = app;
