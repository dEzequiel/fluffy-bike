const Model = require("../../models/nosql/bycicle.js");

const mongoDataAccessLayer = (function () {
  const findByIdAsync = async (id) => {
    return await Model.findById(id);
  };

  return {
    findByIdAsync,
  };
})();

exports.MongoDataAccesApi = mongoDataAccessLayer;
