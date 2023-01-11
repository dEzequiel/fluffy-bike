const ShopModel = require("../../domain/models/shop.js");
const Repository = require("./Repository");
const ObjectId = require("mongodb").ObjectId;

class ShopRepository extends Repository {
  // Create new shop with empty bycicles stock.
  createShop(name) {
    const shop = new ShopModel({ name, bycicles: [] });
    return shop.save();
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

  getStock(shopId) {
    const response = new Promise((resolve, reject) => {
      ShopModel.findById(shopId)
        .populate({
          path: "bycicles",
          model: "Bycicle",
        })
        .exec((err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (result === null) {
              reject(`No document found with id: ${shopId}`);
            }
            console.log(result.bycicles);
            resolve(result);
          }
        });
    });
    return response;
  }
}
module.exports = ShopRepository;
