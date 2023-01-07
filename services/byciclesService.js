const BycicleRepository = require("../domain/BycicleRepository.js");

const byciclesService = (function () {
  const repository = new BycicleRepository();
  let parser;

  const getByIdAsync = async (id) => {
    const entity = repository.getById(id).then((result) => {
      return parser(result);
    });

    return entity;
  };

  const getAllAsync = async () => {
    const entities = repository.getAll().then((result) => {
      const jsonEntities = [];
      result.forEach((entity) => {
        jsonEntities.push(parser(entity));
      });

      return jsonEntities;
    });

    return entities;
  };

  const getByBrandAsync = async (brand) => {
    const entities = repository.getByBrand(brand).then((result) => {
      const jsonEntities = [];
      result.forEach((entity) => {
        jsonEntities.push(parser(entity));
      });

      return jsonEntities;
    });

    return entities;
  };

  const addAsync = async (entity) => {
    const addedEntity = repository.add(entity).then((result) => {
      return parser(result);
    });

    return addedEntity;
  };

  // Private API for request handlers
  parser = (any, options = {}) => {
    const result = JSON.parse(JSON.stringify(any));
    const {
      _id,
      name,
      brand,
      price,
      type,
      frame,
      fork,
      gears,
      brakes,
      wheels,
      tires,
      suspension,
      weight,
      available,
    } = result;

    const {
      includeId = true,
      includeName = true,
      includeBrand = true,
      includePrice = true,
      includeType = true,
      includeFrame = true,
      includeFork = true,
      includeGears = true,
      includeBrakes = true,
      includeWheels = true,
      includeTires = true,
      includeSuspension = true,
      includeWeight = true,
      includeAvailable = true, // Can this be default to true?
    } = options;
    // Return the entity desacoplated from the database object structure (DAO)

    return {
      ...{ id: includeId ? _id : undefined },
      ...{ name: includeName ? name : undefined },
      ...{ brand: includeBrand ? brand : undefined },
      ...{ price: includePrice ? price : undefined },
      ...{ type: includeType ? type : undefined },
      ...{ frame: includeFrame ? frame : undefined },
      ...{ fork: includeFork ? fork : undefined },
      ...{ gears: includeGears ? gears : undefined },
      ...{ brakes: includeBrakes ? brakes : undefined },
      ...{ wheels: includeWheels ? wheels : undefined },
      ...{ tires: includeTires ? tires : undefined },
      ...{ suspension: includeSuspension ? suspension : undefined },
      ...{ weight: includeWeight ? weight : undefined },
      ...{ available: includeAvailable ? available : undefined },
    };
  };

  // Public API for request handlers
  return {
    getByIdAsync,
    getAllAsync,
    getByBrandAsync,
    addAsync,
  };
})();

exports.bycicleServiceApi = byciclesService;
