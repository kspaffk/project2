module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define("Status", {
    statusName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      },
    },
    description: DataTypes.STRING
  });

  Status.associate = function(models) {
    Status.belongsTo(models.Asset);
  };
  return Status;
};
