var db = require("../models");

module.exports = function(app) {
  app.get("/api/itemTypes", function(req, res) {
    db.ItemType.findAndCountAll({
      order: [["type", "ACS"]],
      where: {
        type: req.param.type
      }
    }).then(function(ItemType) {
      console.log(ItemType.count);
      console.log(ItemType.rows);
      res.json(ItemType.rows);
    });
  });

  app.post("/api/itemTypes", function(req, res) {
    db.ItemType.create(req.body).then(function(ItemType) {
      res.json(ItemType);
    });
  });

  app.put("/api/itemTypes", function(req, res) {
    db.ItemType.update(req.body, {
      where: {
        type: req.param.type
      }
    }).then(function(ItemType) {
      console.log(ItemType);
      res.json(ItemType);
    });
  });

  app.delete("/api/itemType/:id", function(req, res) {
    db.ItemType.destroy({
      where: {
        id: req.param.id
      }
    }).then(function(ItemType) {
      console.log(ItemType);
      res.json(ItemType);
    });
  });

  app.post("/api/departments", function(req, res) {
    db.Department.create(req.body).then(function(Department) {
      res.json(Department);
    });
  });

  app.get("/api/users", function(req, res) {
    db.User.findAll({
      where: {
        department: req.body.department,
        assetID: req.body.assetID,
        roleID: req.body.roleID
      }
    }).then(function(User) {
      res.json(User);
    });
  });

  app.put("/api/users", function(req, res) {
    db.User.update(req.body, {
      where: {
        department: req.body.department,
        assetID: req.body.assetID,
        roleID: req.body.roleID
      }
    }).then(function(User) {
      res.json(User);
    });
  });

  app.delete("/api/users", function(req, res) {
    db.User.destroy(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(User) {
      res.json(User);
    });
  });
};