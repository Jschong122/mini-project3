const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
require("dotenv").config();
// Sequelize is a package that abstracts out the need to write
// SQL queries, relying instead on their models to do it for you
const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  }
);

const testConnection = async () => {
  try {
    await database.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
testConnection();

module.exports = { database };
