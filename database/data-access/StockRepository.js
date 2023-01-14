const Repository = require("./Repository");
const StockModel = require("../../domain/models/stock.js");
const ObjectId = require("mongodb").ObjectId;

class StockRepository extends Repository {
  createStock(shopId) {
    const response = new Promise((resolve, reject) => {
      const stock = new StockModel({ shop: shopId, bycicles: [] });

      stock.save((err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return response;
  }
}

module.exports = StockRepository