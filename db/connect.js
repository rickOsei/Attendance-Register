const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectDB = (url) => {
  try {
    mongoose.connect(url);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
