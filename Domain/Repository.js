function Repository() {
  this._data = [];

  Object.defineProperty(this, "getById", {
    value: function (id) {
      return this._data.find((item) => item.id === id);
    },
    writable: true,
  });

  Object.defineProperty(this, "getAll", {
    value: function () {
      return this._data;
    },
    writable: true,
  });
}

Repository.prototype.add = function (item) {
  this._data.push(item);
};

Repository.prototype.get = function (id) {
  return this._data.find((item) => item.id === id);
};

Repository.prototype.update = function (id, item) {
  const index = this._data.findIndex((item) => item.id === id);
  this._data.splice(index, 1, item);
};

Repository.prototype.delete = function (id) {
  const index = this._data.findIndex((item) => item.id === id);
  this._data.splice(index, 1);
};

module.exports = Repository;
