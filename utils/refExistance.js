const models = require("../domain/models");

module.exports = {
  bikeExist: async (bikeId) => {
    const entity = await models.bycicle.findById(id);
    if (!entity) return false;

    return true;
  },

  shopExist: async (id) => {
    const entity = await models.shop.findById(id);

    if (!entity) return false;

    return true;
  },
};
