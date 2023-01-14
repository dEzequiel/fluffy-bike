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

  getById(id) {
    const response = new Promise((resolve, reject) => {
      StockModel.findById(ObjectId(id), (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          if (result === null) {
            reject(`No document found with id: ${id}`);
          }
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

  delete(id) {
    const response = new Promise((resolve, reject) => {
      StockModel.remove(id, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          if (result === null) {
            reject(`No document found with id: ${id}`);
          }
          resolve(result);
        }
      }); // Return plain js object instead of mongoose document
    });

    return response;
  }
}

module.exports = StockRepository;
