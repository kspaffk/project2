module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define("Department", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      },
      description: DataTypes.STRING
    }
  });

  Department.associate = function(models) {
    Department.belongsTo(models.User);
  };
  return Department;
};
