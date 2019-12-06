var db = require("../models");
var whController = require("../controllers/warehouse.js");
const Op = db.Sequelize.Op;

module.exports = function(app) {
  app.get("/api/assets", function(req, res) {
    db.Asset.findAll({}).then(function(assets) {
      res.json(assets);
    });
  });
  
  app.get("/api/assets/active", function(req, res) {
    db.Asset.findAll({ where: { StatusId: { [Op.ne]: [3, 4] }}}).then(function(assets) {
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
      whController.insertAsset(item, function(wasCreated) {
          itemsReturned.push({ "serialNumber": item.serialNumber, "wasCreated": wasCreated });
          if (itemsReturned.length === itemCount) {
            console.log(JSON.stringify(itemsReturned))
            res.json(itemsReturned);
          }
      });
    });
  });

  app.post("/api/returns", function(req, res) {
    itemCount = req.body.length;
    itemsReturned = [];

    req.body.forEach(item => {
      item.UserEmpID = null;
      whController.returnAsset(item, function(wasCreated) {
          itemsReturned.push({ "serialNumber": item.serialNumber, "wasCreated": wasCreated });
          if (itemsReturned.length === itemCount) {
            res.json(itemsReturned);
          }
      });
    });
  });

  
  app.put("/api/assign-asset", function(req, res) {
    console.log(`REQ BODY assetID: ${req.body.assetID}`)
    whController.assignAsset(req.body, function(returnedError) {
      res.json(returnedError);
    });
  });
  
  app.put("/api/asset/:id", function(req, res) {
    // params: [0] = just the assetID (INT) and [1] = object of items to be updated in database
    whController.updateAsset(req.params.id, req.body, function(returnedError) {
      res.json(returnedError);
    });
  });

  app.put("/api/return", function(req, res) {
    whController.returnAsset(req.body, function(returnedError) {
      res.json(returnedError);
    });
  });
};
