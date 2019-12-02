// Sequelize references the standard library
// Pull in Sequelize pkg
var Sequelize = require("sequelize");
// sequelize references the connection to the inv_mgmt DB
var sequelize = require("../config/connection");

module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
