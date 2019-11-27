module.exports = function(sequelize, DataTypes) {
  var ItemType = sequelize.define("ItemType", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  ItemType.associate = function(models) {
    ItemType.belongsTo(models.Asset, {
      allowNull: true
    });
  };

  return User;
};
