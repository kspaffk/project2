var models = require("../models");
var moment = require('moment');

var insert = function(object, cb) {
  models.Asset.findOrCreate({ where: object }).spread(function(
    asset,
    wasCreated
  ) {
    cb(wasCreated);
  }).catch(function(error) {
    wasCreated = false;
    cb(wasCreated);
  });
};

var assignAsset = function(object, cb) {
  var date = moment();
  var returnedError = false;
  models.Asset.update(
    { UserEmpID: object.UserEmpID,  assignDate: date },
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

var updateAsset = function(oldAssetID, newData, cb) {
  var date = moment();
  newData.updatedAt = date;
  console.log(`Old Asset ID: ${JSON.stringify(oldAssetID)}\nNew Data ${JSON.stringify(newData)}`)
  var returnedError = false;
  models.Asset.update(
    newData, { where: { id: oldAssetID.assetID }}
  ).then(function(data) {
    cb(returnedError);
  }).catch(function(error) {
    returnedError = true;
    console.log(error);
    cb(returnedError);
  })
};

exports.insert = insert;
exports.assignAsset = assignAsset;
exports.updateAsset = updateAsset;
