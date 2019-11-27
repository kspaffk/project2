var db = require("../models");
var whController = require("../controllers/warehouse.js");

module.exports = function(app) {
  app.post("/api/assets", function(req, res) {
    console.log(req.body);
    whController.bulkInsert(req.body);
  });
};