var db = require("../models");

module.exports = function(app) {
  app.post("/api/assets", function(req, res) {
    console.log(req.body);
    res.json(req.body);
  });
};
