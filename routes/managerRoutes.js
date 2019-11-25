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
