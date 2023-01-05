const Repository = require("./Repository");
const Model = require("./models/bycicle.js");

class MongoRepository extends Repository {
  constructor(model) {
    super();
    this.dataAccess = model;
  }

  async getAll() {
    return await Model.find();
  }

  async getById(id) {
    return await this.dataAccess.findById(id);
  }
}

module.exports = MongoRepository;
