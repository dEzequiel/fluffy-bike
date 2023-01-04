const services = require("../../Application/services");
// Module pattern

////// Module pattern
const byciclesController = (function () {
  const getById = async (req, res) => {
    // Desacoplate the service from express
    const contextObject = {
      bycicle: req.bycicle,
      id: req.params.id,
    };

    // Await for the service response
    const result =
      await services.byciclesService.bycicleServiceApi.getByIdAsync(
        contextObject
      );

    // Return the response
    return res.status(200).json(result);
  };

  // Public API
  return {
    getById,
  };
})();

exports.bycicleControllerApi = byciclesController;
