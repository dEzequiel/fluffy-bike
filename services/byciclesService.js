const Model = require("../models/nosql/bycicle.js");
const destructDAO = require("../utils/destructBycicleDAO.js");

////// Module pattern
const byciclesService = (function () {
  // Private API
  const getByIdAsync = async (contextObject) => {
    // Destructuring to receive only wanted properties
    const { bycicle, id } = contextObject;

    // Get entity from the database
    const result = await Model.findById(id).exec();

    // Desacoplate response from database object structure (DAO)
    const entity = destructDAO(result, {
      includeId: true,
      includeName: true,
      includeBrand: true,
      includePrice: true,
      includeType: true,
      includeFrame: true,
      includeFork: true,
      includeGears: true,
      includeBrakes: true,
      includeWheels: true,
      includeTires: true,
      includeSuspension: true,
      includeWeight: true,
      includeAvailable: true,
    });

    // Return the entity
    return entity;
  };

  // Public API for request handlers
  return {
    getByIdAsync,
  };
})();

exports.bycicleServiceApi = byciclesService;
