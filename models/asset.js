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
    Asset.hasMany(models.ItemType);
    Asset.hasMany(models.User);
    Asset.hasMany(models.Status);
    Asset.hasMany(models.Return);
  };

  return Asset;
};
