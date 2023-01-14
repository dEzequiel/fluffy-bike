const Repository = require("./Repository");
const StockModel = require("../../domain/models/stock.js");
const bycicle = require("../../domain/models/bycicle");
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

  addBycicleToStock(stockId, bycicleId, quantity) {
    const response = new Promise((resolve, reject) => {
      StockModel.findByIdAndUpdate(
        stockId,
        {
          $push: {
            bycicles: {
              bycicle: bycicleId,
              quantity: quantity,
            },
          },
        },
        { new: true },
        (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (result === null) {
              reject(`No document found with id: ${shopId}`);
            }
            resolve(result);
          }
        }
      );
    });

    return response;
  }
}

module.exports = StockRepository;
