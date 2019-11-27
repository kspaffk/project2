module.exports = function(sequelize, DataTypes) {
  var ItemType = sequelize.define(
    "ItemType",
    {
      itemType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    },
    {
      timestamps: false
    }
  );

  ItemType.associate = function(models) {
    ItemType.belongsTo(models.Asset, {
      onDelete: "SET NULL"
    });
  };

  return ItemType;
};
