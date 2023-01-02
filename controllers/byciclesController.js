const service = require("../services/byciclesService.js");

async function getById(req, res) {
  const contextObject = {
    bycicle: req.bycicle,
    id: req.params.id,
  };
  res.status(200).json(await service.getByIdAsync(contextObject));
}



module.exports.getById = getById;
