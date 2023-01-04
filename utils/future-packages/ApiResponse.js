function ApiResponse(success, statusCode, data) {
  this.success = success;
  this.statusCode = statusCode;
  this.data = data;
}

ApiResponse.prototype.setStatusCode = function (code) {
  this.statusCode = code;
};

ApiResponse.prototype.setSucess = function (status) {
  this.success = status;
};

ApiResponse.prototype.setData = function (data) {
  this.statusCode = data;
};

module.exports = ApiResponse;
