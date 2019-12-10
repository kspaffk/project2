// Creating User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 20]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50]
      }
    },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [8, 20]
    //   }
    // },
    empID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  });

  User.associate = function(models) {
    User.belongsTo(models.Role, {
      allowNull: true
    });
    User.hasMany(models.Asset, {
      onDelete: "SET NULL"
    });
    User.hasMany(models.Return, {
      onDelete: "SET NULL"
    });
    User.belongsTo(models.Department, {
      allowNull: true
    });
  };

  return User;
};
