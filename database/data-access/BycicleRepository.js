const Repository = require("./Repository");
const BycicleModel = require("../../domain/models").BycicleModel

class BycicleRepository extends Repository {
  getAll() {
    const response = new Promise((resolve, reject) => {
      BycicleModel.find({}, (err, result) => {
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
      BycicleModel.findOne({ _id: id }, (err, result) => {
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
      BycicleModel.find({ brand: brand }, (err, result) => {
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

  delete(id) {
    const response = new Promise((resolve, reject) => {
      BycicleModel.findOneAndRemove({ _id: id }, (err, result) => {
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

  add(data) {
    const {
      name,
      brand,
      type,
      frame,
      fork,
      gears,
      brakes,
      wheels,
      tires,
      suspension,
      weight,
    } = data || {};

    const response = new Promise((resolve, reject) => {
      const newDoc = new BycicleModel({
        name,
        brand,
        type,
        frame,
        fork,
        gears,
        brakes,
        wheels,
        tires,
        suspension,
        weight,
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
      BycicleModel.insertMany(data, (err, result) => {
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

  update(id, item) {
    const response = new Promise((resolve, reject) => {
      BycicleModel.findOneAndUpdate(
        { _id: id },
        item,
        { new: true },
        (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (result === null) {
              reject(`No document found with id: ${id}`);
            }
            resolve(result);
          }
        }
      );
    });
    return response;
  }
}

module.exports = BycicleRepository;
