const BycicleRepository = require("../database/data-access/BycicleRepository.js");

const byciclesService = (function () {
  const repository = new BycicleRepository();
  let parser;

  const getByIdAsync = async (id) => { 
    const entity = repository.getById(id).then((result) => {
      return result
    });

    return entity;
  };

  const getAllAsync = async () => {
    const entities = repository.getAll().then((result) => {
      const formEntities = [];
      result.forEach((entity) => {
        formEntities.push(parser(entity));
      });

      return formEntities;
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

  const updateAsync = async (id, data) => {
    const updatedEntity = repository.update(id, data).then((result) => {
      return parser(result);
    });

    return updatedEntity;
  };

  const deleteAsync = async (id) => {
    const deletedEntity = repository.delete(id).then((result) => {
      return parser(result);
    });

    return deletedEntity;
  };

  // Private API for request handlers
  parser = (any, options = {}) => {
    const result = JSON.parse(JSON.stringify(any));
    const {
      _id,
      name,
      brand,
      type,
      frame,
      fork,
      gears,
      brakes,
      wheels,
      tires,
      suspension,
      weight,
    } = result;

    const {
      includeId = true,
      includeName = true,
      includeBrand = true,
      includeType = true,
      includeFrame = true,
      includeFork = true,
      includeGears = true,
      includeBrakes = true,
      includeWheels = true,
      includeTires = true,
      includeSuspension = true,
      includeWeight = true,
    } = options;
    // Return the entity desacoplated from the database object structure (DAO)

    return {
      ...{ id: includeId ? _id : undefined },
      ...{ name: includeName ? name : undefined },
      ...{ brand: includeBrand ? brand : undefined },
      ...{ type: includeType ? type : undefined },
      ...{ frame: includeFrame ? frame : undefined },
      ...{ fork: includeFork ? fork : undefined },
      ...{ gears: includeGears ? gears : undefined },
      ...{ brakes: includeBrakes ? brakes : undefined },
      ...{ wheels: includeWheels ? wheels : undefined },
      ...{ tires: includeTires ? tires : undefined },
      ...{ suspension: includeSuspension ? suspension : undefined },
      ...{ weight: includeWeight ? weight : undefined },
    };
  };

  // Public API for request handlers
  return {
    getByIdAsync,
    getAllAsync,
    getByBrandAsync,
    addAsync,
    deleteAsync,
    updateAsync,
  };
})();

exports.bycicleServiceApi = byciclesService;
