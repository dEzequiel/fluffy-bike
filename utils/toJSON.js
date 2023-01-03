const anyToJSON = (any) => {
  return JSON.parse(JSON.stringify(any));
};

module.exports = anyToJSON;
