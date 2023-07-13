const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please provide name"],
  },
  Role: {
    type: String,
    required: [true, "Please provide role"],
  },
  Email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  Password: {
    type: String,
    required: [true, "Please provide password"],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  return (this.Password = await bcrypt.hash(this.Password, salt));
});

UserSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = bcrypt.compare(inputPassword, this.Password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, userName: this.Name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

module.exports = mongoose.model("User", UserSchema);
