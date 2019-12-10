var db = require("../models");

module.exports = function(app) {
  app.post("/api/itemTypes", function(req, res) {
    db.ItemType.create(req.body).then(function(ItemType) {
      res.json(ItemType);
    });
  });

  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(User) {
      res.json(User);
    });
  });

  app.put("/api/users", function(req, res) {
    db.User.update(req.body, {
      where: {
        department: req.body.department,
        roleName: req.body.roleName
      }
    }).then(function(User) {
      res.json(User);
    });
  });

  app.get("/api/roles", function(req, res) {
    db.Role.findAll({})
      .then(function(roles) {
        console.log("Returning roles");
        res.json(roles);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.get("/api/departments", function(req, res) {
    db.Department.findAll({}).then(function(departments) {
      res.json(departments);
    });
  });

  app.post("/api/departments", function(req, res) {
    db.Department.create(req.body).then(function(Department) {
      res.json(Department);
    });
  });

  app.put("/api/departments", function(req, res) {
    db.Department.update(req.body);
  });
};
