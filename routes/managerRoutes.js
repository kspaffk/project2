var db = require("../models");

module.exports = function(app) {
  app.get("/api/manager", function(req, res) {
    db.Placeholder.findAll({
      where: {
        type: req.param.type
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });
};

app.get("/api/manager/assigned", function(req, res) {
  db.Placeholder.findAll({
    where: {
      assignedMonth: req.param.assignedMonth
    }
  }).then(function(dbPlaceholder) {
    res.json(dbPlaceholder);
  });
});

app.get("/api/manager/retired", function(req, res) {
  db.Placeholder.findAll({
    where: {
      retiredMonth: req.param.retiredMonth
    }
  }).then(function(dbPlaceholder) {
    res.json(dbPlaceholder);
  });
});

app.put("/api/manager/returns", function(req, res) {
  db.Placeholder.update(req.body, {
    where: {
      id: req.body.id,
      date: req.body.date
    }
  }).then(function(dbPlaceholder) {
    res.json(dbPlaceholder);
  });
});

app.put("/api/manager/assets", function(req, res) {
  db.Placeholder.update(req.body, {
    where: {
      itemTypeID: req.body.itemTypeID,
      itemName: req.body.itemName,
      assignedDate: req.body.assignedDate,
      retiredDate: req.body.retiredDate,
      purchaseDate: req.body.purchaseDate,
      statusID: req.body.statusID,
      description: req.body.description
    }
  }).then(function(dbPlaceholder) {
    res.json(dbPlaceholder);
  });
});

app.put("/api/manager/users", function(req, res) {
  db.Placeholder.update(req.body, {
    where: {
      department: req.body.department,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      empID: req.body.empID,
      assetID: req.body.assetID,
      roleID: req.body.roleID
    }
  }).then(function(dbPlaceholder) {
    res.json(dbPlaceholder);
  });
});
