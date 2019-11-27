module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define(
    "Role",
    {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 10]
        }
      },
      description: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );

  Role.associate = function(models) {
    Role.belongsTo(models.User, {
      onDelete: "SET NULL"
    });
  };

  return Role;
};
