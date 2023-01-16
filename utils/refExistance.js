const models = require("../domain/models");

module.exports = {
  bycicleExist: (id) => {
    const entity = models.bycicle.findById(id);

    entity.then((data) => {
      if (data === null) return false;
    });

    return true;
  },

  shopExist: async (id) => {
    const entity = await models.shop.findById(id);

    if (entity === null) return false;

    return true;
  },

  shopAndBikeExists: async (shopId, bycicleId) => {
    const shop = await models.shop.findById(shopId);
    const bycicle = await models.bycicle.findById(bycicleId);

    if (shop === null || bycicle === null) return false;

    return true;
  },
};
