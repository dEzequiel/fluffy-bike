const services = require("../services").byciclesService;
const ApiResponse = require("../utils/future-packages/ApiResponse");

const byciclesController = (function () {
  const getById = async (id) => {
    let response;
    const contextObject = {
      id: id,
    };

    const result = await services.bycicleServiceApi.getByIdAsync(contextObject);

    if (!result) {
      response = new ApiResponse(false, 404, result);
    } else {
      response = new ApiResponse(true, 200, result);
    }

    return response;
  };

  const getAll = async () => {
    let response;
    const result = await services.bycicleServiceApi.getAllAsync();

    // Return the response
    if (!result) {
      response = new ApiResponse(false, 404, result);
    } else {
      response = new ApiResponse(true, 200, result);
    }

    return response;
  };

  const getByBrand = async (brand) => {
    let response;

    const result = await services.bycicleServiceApi.getByBrandAsync(brand);

    if (!result) {
      response = new ApiResponse(false, 404, result);
    } else {
      response = new ApiResponse(true, 200, result);
    }

    return response;
  };

  const addBycicle = async (data) => {
    let response;

    const result = await services.bycicleServiceApi.addAsync(data);

    if (!result) {
      response = new ApiResponse(false, 500, result);
    } else {
      response = new ApiResponse(true, 201, result);
    }

    return response;
  };

  const updateBycicle = async (id, fields) => {
    let response;

    const result = await services.bycicleServiceApi.updateAsync(id, fields);

    if (!result) {
      response = new ApiResponse(false, 500, result);
    } else {
      response = new ApiResponse(true, 200, result);
    }

    return response;
  };

  const deleteBycicle = async (id) => {
    let response;

    const result = await services.bycicleServiceApi.deleteAsync(id);

    if (!result) {
      response = new ApiResponse(false, 404, result);
    } else {
      response = new ApiResponse(true, 200, result);
    }

    return response;
  };

  // Public API
  return {
    getById,
    getAll,
    getByBrand,
    addBycicle,
    deleteBycicle,
    updateBycicle,
  };
})();

exports.bycicleControllerApi = byciclesController;
