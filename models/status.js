module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define(
    "Status",
    {
      statusName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 15]
        }
      },
      description: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );

  Status.associate = function(models) {
    Status.hasOne(models.Asset, {
      onDelete: "SET NULL"
    });
  };
  return Status;
};
