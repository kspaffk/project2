module.exports = function(sequelize, DataTypes) {
  var Return = sequelize.define("Return", {
    returnDate: DataTypes.DATE
  });

  Return.associate = function(models) {
    Return.belongsTo(models.Asset, {
      foreignKey: {
        name: "id",
        allowNull: true
      }
    });

    Return.belongsTo(models.User, {
      foreignKey: {
        name: "empID",
        allowNull: true
      }
    });
  };
  return Return;
};
