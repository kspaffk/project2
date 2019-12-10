module.exports = function(sequelize, DataTypes) {
  var Return = sequelize.define("Return", {
    returnDate: DataTypes.DATE
  });

  Return.associate = function(models) {
    Return.belongsTo(models.Asset, {
      allowNull: true,
      onDelete: "SET NULL"
    });

    Return.belongsTo(models.User, {
      allowNull: true,
      onDelete: "SET NULL"
    });
  };
  return Return;
};
