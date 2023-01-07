function Repository() {
  this._data = [];
}

Repository.prototype.add = function (item) {
  this._data.push(item);
};

Repository.prototype.getById = function (id) {
  return this._data.find((item) => item.id === id);
};

Repository.prototype.getAll = function () {
  return this._data;
}

Repository.prototype.update = function (id, item) {
  const index = this._data.findIndex((item) => item.id === id);
  this._data.splice(index, 1, item);
};

Repository.prototype.delete = function (id) {
  const index = this._data.findIndex((item) => item.id === id);
  this._data.splice(index, 1);
};

module.exports = Repository;
