var models = require("../models");

var bulkInsert = function(object) {
    var exists = [];
    object.forEach(item => {
        if (item.serialNumber && item.serialNumber != "") {
            models.Asset.findOrCreate({ where: item })
            .spread(function(asset, created){           
                if (!created) {
                  exists.push(asset.serialNumber);
                  console.log(`************************\n!!array!!${exists}\n***************************`);
                }
            });
        }
    });
}

exports.bulkInsert = bulkInsert;