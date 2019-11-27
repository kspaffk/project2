var models = require("../models");

var bulkInsert = function(object) {
    var exists = [];
    object.forEach(item => {
        if (item.serialNumber && item.serialNumber != "") {
            models.Asset.findOrCreate({ where: item })
            .spread(function(asset, created){           
                if (!created) {
                    console.log(`*******************\n${asset.serialNumber}\n*****************`)
                  exists.push(asset);
                }
            });
        }
    });
}

exports.bulkInsert = bulkInsert;