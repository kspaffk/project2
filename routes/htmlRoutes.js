var db = require("../models");

module.exports = function(app) {

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
      if(!req.user) {
        console.log(req);
      res.render("index");
      } else {
        if(req.user.RoleId == 2) {
          res.render("manager");
        }
        else if(req.user.RoleId == 4) {
            res.render("warehouse");
          }
        else {
          res.render("users", { user: req.user });
        }
      }
    });
};

