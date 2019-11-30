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
    console.log(req.body);
    whController.bulkInsert(req.body);
  });

  app.post("/api/assets/assign", function(req, res) {
    db.Asset.update(
      { UserEmpID: req.body.UserEmpID },
      { where: { id: req.body.id } }
    ).then(function(data) {
      res.json(data);
    });
  });
};
