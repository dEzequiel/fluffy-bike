const Model = require("../models/nosql/bycicle.js");
const destructDAO = require("../utils/destructBycicleDAO.js");

////// Module pattern
const byciclesService = (function () {
  // Private API
  const getByIdAsync = async (contextObject) => {
    // Destructuring to receive only wanted properties
    const { bycicle, id } = contextObject;

    // Get entity from the database
    const entity = Model.findById(id).exec();

    // Desacoplate Promise response from database object structure (DAO)
    const result = entity
      .then((doc) => {
        if (doc) {
          return destructDAO(doc, {
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
        } else {
          return `No document found with id: ${contextObject.id}`;
        }
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });

    // Return the entity
    return result;
  };

  // Public API for request handlers
  return {
    getByIdAsync,
  };
})();

exports.bycicleServiceApi = byciclesService;
