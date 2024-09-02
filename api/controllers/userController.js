const session = require("express-session");
const { User } = require("../models/user.model");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.session.user_id = user.id;
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed", message: error.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Could not log out, please try again" });
    }
    res.json({ message: "Logout successful" });
  });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res
      .status(500)
      .json({ message: "Failed to get user profile", error: error.message });
  }
};
