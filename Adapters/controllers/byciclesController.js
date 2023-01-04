const services = require("../../Application/services");
// Module pattern

////// Module pattern
const byciclesController = (function () {
  const getById = async (id) => {
    const contextObject = {
      id: id,
    };

    // Await for the service response
    const result =
      await services.byciclesService.bycicleServiceApi.getByIdAsync(
        contextObject
      );

    // Return the response
    return result;
  };

  const getAll = async () => {
    const result =
      await services.byciclesService.bycicleServiceApi.getAllAsync();

    return result;
  };

  // Public API
  return {
    getById,
    getAll,
  };
})();

exports.bycicleControllerApi = byciclesController;
