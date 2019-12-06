var express = require("express");
var router = express.Router();

router.use("/", function(req, res, next) {

  if(!req.user) {
    res.redirect("/");
  }
  next();
});
// GET users listing and pass back to users.handlebars
router.get("/", function(req, res) {
  res.render("../views/login.handlebars", 
    {user: { name: req.user.displayName,
             image: req.user.image }});
});

module.exports = router;