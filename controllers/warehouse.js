var models = require("../models");

var bulkInsert = function(object, cb) {
  models.Asset.findOrCreate({ where: object }).spread(function(
    asset,
    wasCreated
  ) {
    cb(wasCreated);
  });
};

var assignAsset = function(object) {
  models.Asset.update(
    { UserEmpID: object.UserEmpID },
    { where: { id: object.id } }
  ).then(function(data) {
    return data;
  });
};

exports.bulkInsert = bulkInsert;
exports.assignAsset = assignAsset;
