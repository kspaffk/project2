var models = require("../models");
var moment = require('moment');

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
  var date = moment();
  var returnedError = false;
  models.Asset.update(
    { UserEmpID: object.UserEmpID,  assignDate: date, StatusId: 1 },
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

var updateAsset = function(assetID, newData, cb) {
  var date = moment();
  newData.updatedAt = date;
  var returnedError = false;
  models.Asset.update(
    newData, { where: { id: assetID }}
  ).then(function(data) {
    cb(returnedError);
  }).catch(function(error) {
    returnedError = true;
    console.log(error);
    cb(returnedError);
  })
};

var returnAsset = function(object, cb) {
  var date = moment();
  var returnedError = false;
  models.Return.create(
    { UserEmpID: object.UserEmpID,  returnDate: date, createdAt: date, AssetId: object.AssetId }
  )
    .then(function(data) {
      console.log(data);
      models.Asset.update({ StatusId: 2, UserEmpID: null, assignDate: null }, { where: { id: object.AssetId }
      }).then(function(data) {
        cb(returnedError);
      }).catch(function(error) {
        returnedError = true;
        console.log(error);
        cb(returnedError);
      });
    })
    .catch(function(error) {
      returnedError = true;
      console.log(error);
      cb(returnedError);
    });
};

exports.insert = insert;
exports.assignAsset = assignAsset;
exports.updateAsset = updateAsset;
exports.returnAsset = returnAsset;
