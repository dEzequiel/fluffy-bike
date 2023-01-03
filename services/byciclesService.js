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

    // Get entity from the database
    const entity = await mongoDataAccessLayer.findByIdAsync(id);

    // Destructuring to receive only wanted properties
    const result = destructDAO(entity);

    // Return the entity
    return result;
  };

  // Public API for request handlers
  return {
    getByIdAsync,
  };
})();

exports.bycicleServiceApi = byciclesService;
