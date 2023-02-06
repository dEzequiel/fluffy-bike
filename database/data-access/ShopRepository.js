const ShopModel = require("../../domain/models/shop.js");
const Repository = require("./Repository");
const ObjectId = require("mongodb").ObjectId;

class ShopRepository extends Repository {
  // Create new shop with empty bycicles stock.
  createShop(name) {
    const response = new Promise((resolve, reject) => {
      const shop = new ShopModel({ name, bycicles: [] });

      shop.save((err, result) => {
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
      ShopModel.findById(ObjectId(id), (err, result) => {
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

  delete(id) {
    const response = new Promise((resolve, reject) => {
      ShopModel.remove(id, (err, result) => {
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

  async getStock(shopId) {
    const response = new Promise((resolve, reject) => {
      ShopModel.findById(shopId, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          if (result === null) {
            reject(`No document found with id: ${shopId}`);
          }
          resolve(result);
        }
      }).populate("stock");
    });

    return response;
  }

  async;
}
module.exports = ShopRepository;
