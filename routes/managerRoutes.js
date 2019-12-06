var db = require("../models");

module.exports = function(app) {
  app.get("/api/itemtype", function(req, res) {
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

  app.put("/api/itemtype", function(req, res) {
    db.ItemType.update(req.body, {
      where: {
        type: req.param.type
      }
    }).then(function(ItemType) {
      console.log(ItemType.rows);
      res.json(ItemType.rows);
    });
  });

  app.delete("/api/itemtype/:id", function(req, res) {
    db.ItemType.destroy({
      where: {
        id: req.param.id
      }
    }).then(function(ItemType) {
      console.log(ItemType.rows);
      res.json(ItemType.rows);
    });
  });

  app.get("/api/assigned", function(req, res) {
    db.Assigned.findAll({
      order: [["assignedMonth", "ACS"]],
      where: {
        assignedMonth: req.param.assignedMonth
      }
    }).then(function(Assigned) {
      res.json(Assigned);
    });
  });

  app.put("/api/assigned", function(req, res) {
    db.Assigned.update({
      where: {
        assignedMonth: req.param.assignedMonth
      }
    }).then(function(Assigned) {
      res.json(Assigned);
    });
  });

  app.delete("/api/assigned/:id", function(req, res) {
    db.Assigned.destroy({
      where: {
        id: req.param.id
      }
    }).then(function(Assigned) {
      res.json(Assigned);
    });
  });

  app.get("/api/retired", function(req, res) {
    db.Retired.findAll({
      order: [["retiredMonth", "DESC"]],
      where: {
        retiredMonth: req.param.retiredMonth
      }
    }).then(function(Retired) {
      res.json(Retired);
    });
  });

  app.put("/api/retired", function(req, res) {
    db.Retired.update({
      where: {
        retiredMonth: req.param.retiredMonth
      }
    }).then(function(Retired) {
      res.json(Retired);
    });
  });

  app.delete("/api/retired/:id", function(req, res) {
    db.Retired.destroy({
      where: {
        id: req.param.id
      }
    }).then(function(Retired) {
      res.json(Retired);
    });
  });

  app.get("/api/returns", function(req, res) {
    db.Return.findAll({
      where: {
        id: req.body.id,
        date: req.body.date,
        empID: req.body.empID
      }
    }).then(function(Return) {
      res.json(Return);
    });
  });

  app.put("/api/returns", function(req, res) {
    db.Return.update(req.body, {
      where: {
        id: req.body.id,
        date: req.body.date,
        empID: req.body.empID
      }
    }).then(function(Return) {
      res.json(Return);
    });
  });

  app.delete("/api/returns/:id", function(req, res) {
    db.Return.destroy(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(Return) {
      res.json(Return);
    });
  });

  app.get("/api/assets", function(req, res) {
    db.Asset.findAll({
      where: {
        itemTypeID: req.body.itemTypeID,
        itemName: req.body.itemName,
        assignedDate: req.body.assignedDate,
        retiredDate: req.body.retiredDate,
        purchaseDate: req.body.purchaseDate,
        statusID: req.body.statusID,
        description: req.body.description
      }
    }).then(function(Asset) {
      res.json(Asset);
    });
  });

  app.put("/api/assets", function(req, res) {
    db.Asset.update(req.body, {
      where: {
        itemTypeID: req.body.itemTypeID,
        itemName: req.body.itemName,
        assignedDate: req.body.assignedDate,
        retiredDate: req.body.retiredDate,
        purchaseDate: req.body.purchaseDate,
        statusID: req.body.statusID,
        description: req.body.description
      }
    }).then(function(Asset) {
      res.json(Asset);
    });
  });

  app.delete("/api/assets/:id", function(req, res) {
    db.Asset.destroy(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(Asset) {
      res.json(Asset);
    });
  });

  app.get("/api/users", function(req, res) {
    db.User.findAll({
      where: {
        department: req.body.department,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        empID: req.body.empID,
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        empID: req.body.empID,
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
