const Repository = require("./Repository");
const RentModel = require("../../domain/models/rent.js");
const ObjectId = require("mongodb").ObjectId;
const refExistance = require("../../utils/refExistance");

class RentRepository extends Repository {
  createRentPool(shopId) {
    const response = new Promise((resolve, reject) => {
      const shopExist = refExistance.shopExist(shopId);

      shopExist.then((result) => {
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

  async addByciclesToRentPool(shopId, bycicleId, status) {
    const shopExist = await refExistance.shopExist(shopId);
    const bycicleExist = await refExistance.bycicleExist(bycicleId);

    if (!shopExist || !bycicleExist) {
      throw new Error("Shop or bycicle doesn't exist");
    }
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

  async getRentPool(shopId) {
    const result = await RentModel.findOne({ shop: shopId });
    return result;
  }

  async rentBike(shopId, bycicleId) {
    const shopExist = await refExistance.shopExist(shopId);
    const bycicleExist = await refExistance.bycicleExist(bycicleId);

    if (!shopExist || !bycicleExist) {
      throw new Error("Shop or bycicle doesn't exist");
    }

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

  async unrentBike(shopId, bycicleId) {
    const shopExist = await refExistance.shopExist(shopId);
    const bycicleExist = await refExistance.bycicleExist(bycicleId);

    if (!shopExist || !bycicleExist) {
      throw new Error("Shop or bycicle doesn't exist");
    }

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
