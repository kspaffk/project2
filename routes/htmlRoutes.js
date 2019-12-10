var auth = require("./auth");
var whController = require("../controllers/warehouse");

module.exports = function(app) {
    app.use("/auth", auth);
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
      });
    app.get("*", function(req, res) {
        if (!req.user) {
            res.render("index");
        } else {
            if (req.user.RoleId == 1) {
                res.render("manager");
            } else if (req.user.RoleId == 3) {
                res.render("warehouse");
            } else {
                var user = req.user;
                whController.getAssignedAssets(user.empID, function(data) {
                  var assetArray = [];
                  data.forEach(asset => {
                    assetArray.push(asset.dataValues);
                  });
                  hbsObject = { assets: assetArray, user: req.user }; 
                  res.render("users", hbsObject);
                });
            }
        }
    });
};
