var models = require("../models");

var insert = function(object, cb) {
  models.Asset.findOrCreate({ where: object })
    .spread(function(asset, wasCreated) {
      cb(wasCreated);
    })
    .catch(function(error) {
      wasCreated = false;
      cb(wasCreated);
    });
};

var assignAsset = function(object, cb) {
  var returnedError = false;
  models.Asset.update(
    { UserEmpID: object.UserEmpID },
    { where: { id: object.id } }
  )
    .then(function(data) {
      console.log(data);
      cb(returnedError);
    })
    .catch(function(error) {
      returnedError = true;
      console.log(error);
      cb(returnedError);
    });
};

exports.insert = insert;
exports.assignAsset = assignAsset;
