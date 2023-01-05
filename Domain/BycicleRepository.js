const Repository = require("./Repository");
const Model = require("./models/bycicle.js");

const base = new Repository();
var bycicleRepository = Object.create(base);
bycicleRepository = {
  getById: async (id) => {
    return await Model.findById(id);
  },
};

module.exports = bycicleRepository;
