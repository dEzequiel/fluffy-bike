const Repository = require("./Repository");
const Model = require("./models/bycicle.js");

class MongoRepository extends Repository {
  getAll() {
    const response = new Promise((resolve, reject) => {
      Model.find({}, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          if (result === null) {
            reject(`Colection is empty`);
          }
          resolve(result);
        }
      });
    });
    return response;
  }

  getById(id) {
    const response = new Promise((resolve, reject) => {
      Model.findById(id, (err, result) => {
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

  getByBrand(brand) {
    const response = new Promise((resolve, reject) => {
      Model.find({ brand: brand }, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          if (result === null) {
            reject(`No document found with brand: ${brand}`);
          }
          resolve(result);
        }
      }); // Return plain js object instead of mongoose document
    });

    return response;
  }
}

module.exports = MongoRepository;
