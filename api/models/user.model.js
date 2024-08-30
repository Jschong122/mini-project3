const { DataTypes, Model } = require("sequelize");
const { database } = require("../dbConnect");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("User", "Manager"),
      defaultValue: "User",
    },
  },
  {
    sequelize: database,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

module.exports = { User };
