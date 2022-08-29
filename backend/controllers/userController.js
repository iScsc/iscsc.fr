const User = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) {
    res.status(418).send("Missing username or password");
  }

  bcrypt.genSalt(SALT_ROUND, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const user = new User({
        username,
        hashedPassword: hash,
        email,
      });
      user
        .save()
        .then((result) => {
          res.send(`User ${result.username} successfully created`);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(418).send("Missing username or password");
  }

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
