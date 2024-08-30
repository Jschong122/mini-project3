const { DataTypes, Model } = require("sequelize");
const { database } = require("../dbConnect");

const LeaveRequest = database.define(
  "leave_request",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
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
    timestamps: false,
    updatedAt: false,
  }
);
module.exports = { LeaveRequest };
