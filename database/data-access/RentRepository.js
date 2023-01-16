const Repository = require("./Repository");
const RentModel = require("../../domain/models/rent.js");
const ObjectId = require("mongodb").ObjectId;
const refExistance = require("../../utils/refExistance");

class RentRepository extends Repository {
  createRentPool(shopId) {
    const response = new Promise((resolve, reject) => {
      refExistance.shopExist(shopId).then((result) => {
        if (!result) {
          reject(new Error("Shop doesn't exist"));
        }
      });

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
      refExistance.shopExist(shopId).then((result) => {
        if (!result) {
          reject(new Error("Shop doesn't exist"));
        }

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
    });
    return response;
  }

  getRentPool(shopId) {
    const response = new Promise((resolve, reject) => {
      refExistance.shopExist(shopId).then((result) => {
        if (result === false) {
          reject(new Error("Shop doesn't exist"));
        }

        const rent = RentModel.findOne({ shop: shopId });

        rent
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });

    return response;
  }

  rentBike(shopId, bycicleId) {
    const response = new Promise((resolve, reject) => {
      refExistance.shopAndBikeExists(shopId, bycicleId).then((result) => {
        if (result === false) {
          return reject(new Error("Some entities reference don't exist"));
        }
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
    });
    return response;
  }

  async unrentBike(shopId, bycicleId) {
    const response = new Promise((resolve, reject) => {
      refExistance.shopAndBikeExists(shopId, bycicleId).then((result) => {
        if (result === false) {
          return reject(new Error("Some entities reference don't exist"));
        }
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
          { $set: { "bycicles.$.available": "true" } },
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
    });
    return response;
  }

  getByciclesFilterByRent(shopId, rentStatus) {
    const response = new Promise((resolve, reject) => {
      RentModel.aggregate([
        {
          $match: {
            shop: ObjectId(shopId),
          },
        },
        {
          $project: {
            bycicles: {
              $filter: {
                input: "$bycicles",
                as: "bycicle",
                cond: {
                  $eq: ["$$bycicle.available", rentStatus],
                },
              },
            },
          },
        },
      ])
        .then((res) => {
          resolve(res[0]);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });

    return response;
  }
}
module.exports = RentRepository;
