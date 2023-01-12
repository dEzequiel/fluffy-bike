const ShopRepository = require("../database/data-access/ShopRepository.js");

const shopService = (function () {
  const repository = new ShopRepository();
  let parser;

  const getByIdAsync = async (id) => {
    const entity = repository.getById(id).then((result) => {
      delete result._v
      let { _id: id, ...rest } = entity;
      return { id, ...rest };
      
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
  };
})();

exports.shopServiceApi = shopService;
