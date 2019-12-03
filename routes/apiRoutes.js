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

  app.post("/api/assets", function(req, res) {
    itemCount = req.body.length;
    itemsReturned = [];

    req.body.forEach(item => {
      whController.bulkInsert(item, function(wasCreated) {
          itemsReturned.push({ "serialNumber": item.serialNumber, "wasCreated": wasCreated });
          if (itemsReturned.length === itemCount) {
            console.log(JSON.stringify(itemsReturned))
            res.json(itemsReturned);
          }
      });
    });
  });

  app.post("/api/assets/assign", function(req, res) {
    res.json(whController.assignAsset(req.body));
  });
};
