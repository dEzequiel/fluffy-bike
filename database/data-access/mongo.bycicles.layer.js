const Model = require("../../domain/models/bycicle.js");

//
const mongoDataAccessLayer = (function () {
  const findByIdAsync = (id) => {
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
  };

  const findAllAsync = () => {
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
  };

  return {
    findByIdAsync,
    findAllAsync,
  };
})();

exports.MongoDataAccesApi = mongoDataAccessLayer;
