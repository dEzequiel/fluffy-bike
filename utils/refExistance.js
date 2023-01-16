const models = require("../domain/models");

module.exports = {
  bycicleExist: async (id) => {
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
