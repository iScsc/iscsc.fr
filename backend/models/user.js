const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
  const exists = await this.findOne({ $or: [{ email }, { username }] });
  if (exists) {
    throw Error("User already exists");
  }

  const SALT_ROUND = 10;
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = this.create({ username, hashedPassword, email });
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
