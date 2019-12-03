var db = require("../models");
var whController = require("../controllers/warehouse.js");

module.exports = function(app) {
  app.get("/api/assets", function(req, res) {
    db.Asset.findAll({}).then(function(assets) {
      res.json(assets);
    });
  });

  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(users) {
      res.json(users);
    });
  });

  app.get("/api/itemtypes", function(req, res) {
    db.ItemType.findAll({}).then(function(itemTypes) {
      res.json(itemTypes);
    });
  });

  app.post("/api/assets", function(req, res) {
    console.log(req.body);
    itemCount = req.body.length;
    itemsReturned = [];

    req.body.forEach(item => {
      whController.insert(item, function(wasCreated) {
          itemsReturned.push({ "serialNumber": item.serialNumber, "wasCreated": wasCreated });
          if (itemsReturned.length === itemCount) {
            console.log(JSON.stringify(itemsReturned))
            res.json(itemsReturned);
          }
      });
    });
  });

  app.put("/api/asset/assign", function(req, res) {
    whController.assignAsset(req.body, function(returnedError) {
      res.json(returnedError);
    });
  });
};
