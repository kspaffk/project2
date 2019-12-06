var db = require("../models");
var whController = require("../controllers/warehouse.js");

module.exports = function(app) {
  app.get("/api/assets", function(req, res) {
    db.Asset.findAll({}).then(function(assets) {
      res.json(assets);
    });
  });

  app.get("/api/asset/:assetid", function(req, res) {
    db.Asset.findOne({ where: { id: req.params.assetid }}).then(function(asset) {
      res.json(asset);
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

  app.get("/api/itemtype/:id", function(req, res) {
    db.ItemType.findOne({ where: { id: req.params.id }}).then(function(itemType) {
      res.json(itemType);
    });
  });

  app.post("/api/assets", function(req, res) {
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

  app.put("/api/assets", function(req, res) {
    whController.updateAsset(req.body[0], req.body[1], function(returnedError) {
      res.json(returnedError);
    });
  });

  app.put("/api/asset/assign", function(req, res) {
    whController.assignAsset(req.body, function(returnedError) {
      res.json(returnedError);
    });
  });

  app.put("/api/return", function(req, res) {
    whController.returnAsset(req.body, function(returnedError) {
      res.json(returnedError);
    });
  });
};
