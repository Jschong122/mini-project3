const { User } = require("../models/user.model");

async function getAllUsers(req, res) {
  console.log(res);
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function addUser(req, res) {
  try {
    const users = await User.create(req.body);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllUsers, addUser };
