const Model = require("../../Domain/models/bycicle.js");
const anyToJSON = require("../../Application/utils/toJSON.js");
const mongoDataAccessLayer =
  require("../../Infraestructure/data-access/mongo.bycicles.layer.js").MongoDataAccesApi;

////// Module pattern
const byciclesService = (function () {
  // Private API
  const getByIdAsync = async (contextObject) => {
    // Destructuring to receive only wanted properties
    const { id } = contextObject;

    // Get entity from the database and process it to return plain object
    const entity = mongoDataAccessLayer.findByIdAsync(id).then((result) => {
      const forGet = anyToJSON(result);
      return forGet;
    });

    // Return the plain data entity
    return entity;
  };

  const getAllAsync = async () => {
    const entities = mongoDataAccessLayer.findAllAsync().then((result) => {
      const forGet = [];
      result.forEach((res) => {
        forGet.push(anyToJSON(res));
      });

      return forGet;
    });

    return entities;
  };

  // Public API for request handlers
  return {
    getByIdAsync,
    getAllAsync,
  };
})();

exports.bycicleServiceApi = byciclesService;
