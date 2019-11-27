module.exports = function(sequelize, DataTypes) {
  var Asset = sequelize.define("Asset", {
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      },
      description: DataTypes.STRING,
      itemName: DataTypes.STRING,
      purchaseDate: DataTypes.DATE,
      assignDate: DataTypes.DATE,
      retiredDate: DataTypes.DATE
    }
  });

  Asset.associate = function(models) {
    Asset.hasOne(models.ItemType, {
      foreignKey: {
        name: "id",
        allowNull: true
      }
    });
    Asset.hasOne(models.User, {
      foreignKey: {
        name: "empID",
        allowNull: true
      }
    });
    Asset.hasOne(models.Status, {
      foreignKey: {
        name: "id",
        allowNull: false
      }
    });
    Asset.hasMany(models.Return, {
      foreignKey: {
        name: "id",
        allowNull: true
      }
    });
  };
  return Asset;
};
