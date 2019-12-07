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
  console.log(req)

  res.render("../views/login.handlebars", {dbUser});
});

module.exports = router;