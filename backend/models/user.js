const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (email, username, password) {
  // Validation
  if (!email || !username || !password) {
    throw Error("All fields must be filed");
  }
  if (!validator.isEmail(email)) {
    throw Error("The email provided is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("The password provided is not strong enough. It must be at least 8-character long, and contain a lowercase, uppercase, number and symbol.");
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = this.create({ username, hashedPassword, email });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filed");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Access denied: user not found");
  }

  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) {
    throw Error("Access denied: wrong password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
