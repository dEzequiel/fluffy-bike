const anyToJSON = require("..//utils/toJSON.js");
const MongoRepository = require("../Domain/BycicleRepository.js");
const mongoDataAccessLayer =
  require("../database/data-access/mongo.bycicles.layer.js").MongoDataAccesApi;

////// Module pattern
const byciclesService = (function () {
  // Private API
  const repository = new MongoRepository();
  const getByIdAsync = async (contextObject) => {
    // Destructuring to receive only wanted properties
    const { id } = contextObject;

    // Get entity from the database and process it to return plain object
    const entity = repository.getById(id).then((result) => {
      const forGet = anyToJSON(result);
      return forGet;
    });

    // Return the plain data entity
    return entity;
  };

  const getAllAsync = async () => {
    const entities = repository.getAll().then((result) => {
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
