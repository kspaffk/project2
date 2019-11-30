var db = require("../models");

module.exports = function(app) {
  app.get("/api/manager/type", function(req, res) {
    db.Placeholder.findAndCountAll({
      order: [["type", "ACS"]],
      where: {
        type: req.param.type
      }
    }).then(function(dbPlaceholder) {
      console.log(dbPlaceholder.count);
      console.log(dbPlaceholder.rows);
      res.json(dbPlaceholder.rows);
    });
  });

  app.put("/api/manager/type", function(req, res) {
    db.Placeholder.update(req.body, {
      where: {
        type: req.param.type
      }
    }).then(function(dbPlaceholder) {
      console.log(dbPlaceholder.rows);
      res.json(dbPlaceholder.rows);
    });
  });

  app.delete("/api/manager/type/:id", function(req, res) {
    db.Placeholder.destroy({
      where: {
        id: req.param.id
      }
    }).then(function(dbPlaceholder) {
      console.log(dbPlaceholder.rows);
      res.json(dbPlaceholder.rows);
    });
  });

  app.get("/api/manager/assigned", function(req, res) {
    db.Placeholder.findAll({
      order: [["assignedMonth", "ACS"]],
      where: {
        assignedMonth: req.param.assignedMonth
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.put("/api/manager/assigned", function(req, res) {
    db.Placeholder.update({
      where: {
        assignedMonth: req.param.assignedMonth
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.delete("/api/manager/assigned/:id", function(req, res) {
    db.Placeholder.destroy({
      where: {
        id: req.param.id
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.get("/api/manager/retired", function(req, res) {
    db.Placeholder.findAll({
      order: [["retiredMonth", "DESC"]],
      where: {
        retiredMonth: req.param.retiredMonth
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.put("/api/manager/retired", function(req, res) {
    db.Placeholder.update({
      where: {
        retiredMonth: req.param.retiredMonth
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.delete("/api/manager/retired/:id", function(req, res) {
    db.Placeholder.destroy({
      where: {
        id: req.param.id
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.get("/api/manager/returns", function(req, res) {
    db.Placeholder.findAll({
      where: {
        id: req.body.id,
        date: req.body.date,
        empID: req.body.empID
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.put("/api/manager/returns", function(req, res) {
    db.Placeholder.update(req.body, {
      where: {
        id: req.body.id,
        date: req.body.date,
        empID: req.body.empID
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.delete("/api/manager/returns/:id", function(req, res) {
    db.Placeholder.destroy(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.get("/api/manager/assets", function(req, res) {
    db.Placeholder.findAll({
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

  app.delete("/api/manager/assets/:id", function(req, res) {
    db.Placeholder.destroy(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });

  app.get("/api/manager/users", function(req, res) {
    db.Placeholder.findAll({
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

  app.delete("/api/manager/users", function(req, res) {
    db.Placeholder.destroy(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(dbPlaceholder) {
      res.json(dbPlaceholder);
    });
  });
};
