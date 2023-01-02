const Model = require("../models/nosql/bycicle.js");

async function getByIdAsync(contextObject) {
  const { bycicle, id } = contextObject;
  return await Model.findById(id).exec();
}

module.exports.getByIdAsync = getByIdAsync;
