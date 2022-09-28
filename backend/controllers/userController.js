const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // This function create a new user object with a hashed password
    const user = await User.signup(email, username, password);

    // Create a token
    const token = createToken(user._id);
    res.status(200).json({ email, username, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, username: user.username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { login, signup };
