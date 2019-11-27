module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      },
      description: DataTypes.STRING
    }
  });

  Role.associate = function(models) {
    Role.belongsTo(models.User);
  };
  return Role;
};
