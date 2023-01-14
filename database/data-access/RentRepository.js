const Repository = require("./Repository");
const RentModel = require("../../domain/models/rent.js");
const ObjectId = require("mongodb").ObjectId;

class RentRepository extends Repository {
  createRentPool(shopId) {
    const response = new Promise((resolve, reject) => {
      const rent = new RentModel({ shop: shopId, bycicles: [] });

      rent.save((err, result) => {
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

  addByciclesToRentPool(shopId, bycicleId, status) {
    const response = new Promise((resolve, reject) => {
      RentModel.findOneAndUpdate(
        { shop: shopId },
        {
          $push: {
            bycicles: {
              bycicle: bycicleId,
              available: status,
            },
          },
        },
        { new: true },
        (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    return response;
  }

  rentBike(shopId, bycicleId) {
    const response = new Promise((resolve, reject) => {
      RentModel.findOneAndUpdate(
        {
          $and: [
            { shop: shopId },
            {
              bycicles: {
                $elemMatch: {
                  bycicle: bycicleId,
                },
              },
            },
          ],
        },
        { $set: { "bycicles.$.available": "false" } },
        { new: true },
        (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    return response;
  }
}

module.exports = RentRepository;
