var connection = require("../config/connection");

module.exports = function(sequelize, DataTypes) {
  var Asset = sequelize.define("Asset", {
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    description: DataTypes.STRING,
    itemName: DataTypes.STRING,
    purchaseDate: DataTypes.DATE,
    assignDate: DataTypes.DATE,
    retiredDate: DataTypes.DATE
  });

  Asset.associate = function(models) {
    Asset.hasOne(models.ItemType);
    Asset.hasOne(models.User, {
      allowNull: true
    });
    Asset.hasOne(models.Status);
    Asset.hasMany(models.Return, {
      allowNull: true
    });
  };

  return Asset;
};
