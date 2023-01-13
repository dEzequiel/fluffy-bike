const ShopRepository = require("../database/data-access/ShopRepository.js");

const shopService = (function () {
  const repository = new ShopRepository();
  let parser;

  const getByIdAsync = async (id) => {
    const entity = repository.getById(id).then((result) => {
      let pojo = result.toObject();

      let { _id: id, name, bycicles } = pojo;

      return { id, name, bycicles };
    });

    return entity;
  };

  const addAsync = async (name) => {
    const entity = repository.createShop(name).then((result) => {
      let pojo = result.toObject();

      let { _id: id, name, bycicles } = pojo;

      return { id, name, bycicles };
    });

    return entity;
  };

  const addBycicleAsync = async (shopId, bycicle) => {
    const entity = repository
      .addBycicleToShop(shopId, bycicle)
      .then((result) => {
        let pojo = result.toObject();

        let { _id: id, name, bycicles } = pojo;

        return { id, name, bycicles };
      });

    return entity;
  };
  // const getStockAsync = async (id) => {
  //   const shop = await repository.getStock(id).then((result) => {
  //     return parser(result);
  //   });
  // };

  // Private API for request handlers
  parser;

  return {
    getByIdAsync,
    addAsync,
    addBycicleAsync,
  };
})();

exports.shopServiceApi = shopService;
