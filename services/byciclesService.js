const Model = require("../models/nosql/bycicle.js");
const destructDAO = require("../utils/destructBycicleDAO.js");
const mongoDataAccessLayer =
  require("../infraestructure/data-access/mongo.bycicles.layer.js").MongoDataAccesApi;

////// Module pattern
const byciclesService = (function () {
  // Private API
  const getByIdAsync = async (contextObject) => {
    // Destructuring to receive only wanted properties
    const { bycicle, id } = contextObject;

    // Get entity from the database and process it to return plain object
    const entity = mongoDataAccessLayer.findByIdAsync(id).then((result) => {
      const forGet = destructDAO(result);

      return forGet;
    });

    // Return the plain data entity
    return entity;
  };

  // Public API for request handlers
  return {
    getByIdAsync,
  };
})();

exports.bycicleServiceApi = byciclesService;
