const Model = require("../../models/nosql/bycicle.js");

//
const mongoDataAccessLayer = (function () {
  const findByIdAsync = (id) => {
    const response = new Promise((resolve, reject) => {
      Model.findById(id, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return response;
  };

  return {
    findByIdAsync,
  };
})();

exports.MongoDataAccesApi = mongoDataAccessLayer;
