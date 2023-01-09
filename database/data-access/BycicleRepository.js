const Repository = require("./Repository");
const Model = require("../../domain/models/bycicle.js");
const ObjectId = require("mongodb").ObjectId;

class BycicleRepository extends Repository {
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
      Model.findById(ObjectId(id), (err, result) => {
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
          if (result.length === 0) {
            reject(`No document found with brand: ${brand}`);
          }
          resolve(result);
        }
      }); // Return plain js object instead of mongoose document
    });

    return response;
  }

  remove(id) {
    const response = new Promise((resolve, reject) => {
      Model.findByIdAndDelete(id, (err, result) => {
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

  add(data) {
    const {
      name,
      brand,
      price,
      type,
      frame,
      fork,
      gears,
      brakes,
      wheels,
      tires,
      suspension,
      weight,
      available,
    } = data || {};

    const response = new Promise((resolve, reject) => {
      const newDoc = new Model({
        name,
        brand,
        price,
        type,
        frame,
        fork,
        gears,
        brakes,
        wheels,
        tires,
        suspension,
        weight,
        available,
      });

      newDoc.save((err, result) => {
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

  addMany(data) {
    const response = new Promise((resolve, reject) => {
      Model.insertMany(data, (err, result) => {
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
}

module.exports = BycicleRepository;
