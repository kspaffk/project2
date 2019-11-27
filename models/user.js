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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 20]
      }
    },
    empID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  });

  User.associate = function(models) {
    User.hasOne(models.Role);
    User.belongsTo(models.Asset, {
      onDelete: "SET NULL"
    });
    User.hasMany(models.Return, {
      allowNull: true
    });
    User.hasOne(models.Department);
  };

  return User;
};
