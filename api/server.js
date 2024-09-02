require("dotenv").config();
const express = require("express");
const userController = require("./controllers/userController");
const userRoutes = require("./routes/userRoutes");
const { database } = require("./dbConnect");
const leaveRequestRoutes = require("./routes/leaveRequestsRoutes");
const { LeaveRequests } = require("./models/leaveRequestModel");
const { foreignkeys } = require("./node_modules/sequelize/lib/model");
const { User } = require("./models/user.model");
const session = require("express-session");
const authMiddleware = require("./middleware/auth");
const cors = require("cors");
const { NextApiRequest, NextApiResponse } = require("next");

const app = express();

// Express port
const port = process.env.PORT || 5001;

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

// Set up session middleware

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
// set up routes
//for any specific route go to Controller (app.get etc...)
app.use("/users", userRoutes);
app.use("/leave-requests", leaveRequestRoutes);

User.hasMany(LeaveRequests, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

LeaveRequests.belongsTo(User, {
  foreignkey: "user_id",
  allowNull: false,
});

// sync models -- only for testing and update the models
const syncDatabase = async () => {
  try {
    await database.sync({ alter: true });
    console.log("all models were synced successfully");
  } catch (error) {
    console.error("Failed to sync data", error);
  }
};

syncDatabase();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
