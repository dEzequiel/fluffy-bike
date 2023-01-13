const ShopModel = require("../../domain/models/shop.js");
const Repository = require("./Repository");
const ObjectId = require("mongodb").ObjectId;

class ShopRepository extends Repository {
  // Create new shop with empty bycicles stock.
  createShop(name) {
    const response = new Promise((resolve, reject) => {
      const shop = new ShopModel({ name, bycicles: [] });

      shop.save((err, result) => {
        if(err){
          console.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      })
      })
      return response

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

  addBycicleToShop(shopId, bycicleId) {
    const response = new Promise((resolve, reject) => {
      ShopModel.findByIdAndUpdate(
        shopId,
        { $push: { bycicles: bycicleId } },
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
      }).populate("bycicles");
    });

    return response;
  }

  async 
}
module.exports = ShopRepository;
