module.exports = function(sequelize, DataTypes) {
  var Return = sequelize.define("Return", {
    returnDate: DataTypes.DATE
  });

  Return.associate = function(models) {
    Return.hasOne(models.Asset, {
      foreignKey: {
        name: "id",
        allowNull: true
      }
    });

    Return.hasOne(models.User, {
      foreignKey: {
        name: "empID",
        allowNull: true
      }
    });
  };
  return Return;
};
