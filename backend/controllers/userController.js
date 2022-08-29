const User = require("../models/user");

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // This function create a new user object with a hashed password
    const user = await User.signup(email, username, password);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const login = async (req, res) => {
  // Get hashedPassword
  User.findOne({ username }, (err, result) => {
    if (result) {
      const { hashedPassword } = result;

      // compare
      bcrypt.compare(password, hashedPassword, function (err, result) {
        if (result) {
          res.send(`Logged as ${username} successfully`);
        } else {
          res.status(418).send(`Access denied, please try again.`);
        }
      });
    } else {
      res.status(418).send(`Access denied, please try again.`);
    }
  });
};

module.exports = { login, signup };
