const { DataTypes, Model } = require("sequelize");
const { database } = require("../dbConnect");

const LeaveRequests = database.define(
  "leave_requests",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      field: "user_id",
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
    submittedDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },

  {
    sequelize: database,
    modelName: "LeaveRequests",
    tableName: "leave_requests",
    timestamps: false,
    updatedAt: false,
  }
);

module.exports = { LeaveRequests };
