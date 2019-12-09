var auth = require("./auth");
var whController = require("../controllers/warehouse");

module.exports = function(app) {
    app.use("/auth", auth);
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
      });
    app.get("*", function(req, res) {
        console.log("Getting ******************");
        console.log(req.user);
        if (!req.user) {
            console.log("NO REQ USER");
            res.render("index");
        } else {
            console.log("REQ USER IS HERE!!");
            if (req.user.RoleId == 1) {
                console.log("REQ USER IS 2");
                res.render("manager");
            } else if (req.user.RoleId == 3) {
                console.log("REQ USER IS 4");
                res.render("warehouse");
            } else {
                console.log("REQ USER IS **other**");
                var user = req.user;
                whController.getAssignedAssets(user.empID, function(data) {
                  var assetArray = [];
                  data.forEach(asset => {
                    console.log(asset.dataValues);
                    assetArray.push(asset.dataValues);
                  });
                  hbsObject = { assets: assetArray, user: req.user }; 
                  res.render("users", hbsObject);
                });
            }
        }
    });
};
