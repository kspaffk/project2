var models = require("../models");
var moment = require("moment");

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 20418280ff540f28e4995685b785d284c0e39ce6
var insertAsset = function(object, cb) {
    object.StatusId = 2;
    models.Asset.findOrCreate({ where: object })
        .spread(function(asset, wasCreated) {
            cb(wasCreated);
        })
        .catch(function(error) {
            wasCreated = false;
            cb(wasCreated);
        });
<<<<<<< HEAD
=======
var insert = function(object, cb) {
  models.Asset.findOrCreate({ where: object })
    .spread(function(asset, wasCreated) {
      cb(wasCreated);
    })
    .catch(function(error) {
      wasCreated = false;
      cb(wasCreated);
    });
>>>>>>> c639dd970a34870bab1a2429b3b71afd22b262d3
=======
>>>>>>> 20418280ff540f28e4995685b785d284c0e39ce6
};

var assignAsset = function(object, cb) {
    var date = moment();
    var returnedError = false;
    models.Asset.update(
        { UserEmpID: object.UserEmpID, assignDate: date, StatusId: 1 },
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
    models.Asset.update(newData, { where: { id: assetID } })
        .then(function(data) {
            cb(returnedError);
        })
        .catch(function(error) {
            returnedError = true;
            console.log(error);
            cb(returnedError);
        });
};

var returnAsset = function(object, cb) {
    var date = moment();
    var returnedError = false;
    models.Asset.findOne({ where: { serialNumber: object.serialNumber } }).then(
        function(asset) {
            models.Return.create({
                UserEmpID: object.UserEmpID,
                returnDate: date,
                createdAt: date,
                AssetId: asset.id
            })
                .then(function(data) {
                    console.log(data);
                    models.Asset.update(
                        { StatusId: 2, UserEmpID: null, assignDate: null },
                        { where: { id: asset.id } }
                    )
                        .then(function(data) {
                            cb(returnedError);
                        })
                        .catch(function(error) {
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
        }
    );
};

exports.insertAsset = insertAsset;
exports.assignAsset = assignAsset;
exports.updateAsset = updateAsset;
exports.returnAsset = returnAsset;
