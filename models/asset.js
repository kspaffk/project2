module.exports = function(sequelize, DataTypes) {
  var Asset = sequelize.define("Asset", {
    serialNumber: {
      type: DataTypes.STRING,
      unique: true,
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
    Asset.belongsTo(models.ItemType);
    Asset.belongsTo(models.User, {
      allowNull: true
    });
    Asset.belongsTo(models.Status);
    Asset.hasMany(models.Return, {
      allowNull: true
    });
  };

  return Asset;
};
