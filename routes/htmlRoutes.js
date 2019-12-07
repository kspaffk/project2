var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbUser
      });
    });
  });

  app.get("/error/", function(req, res) {
    res.render("error");
  });

  // Load example page and pass in an example by id
  app.get("/user/", function(req, res) {
      request = JSON.stringify(req);
      console.log(`REQ IS: ${request}`)
      res.render("users");
  });

  app.get("/warehouse/", function(req, res) {
    res.render("warehouse");
  });

  app.get("/manager/", function(req, res) {
    res.render("manager");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
