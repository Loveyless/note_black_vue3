const mongoose = require("mongoose");

const usersRule = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: String, default: new Date().toLocaleString() },
  enable_flag: { type: String, default: "Y" },
});

module.exports = mongoose.model("users", usersRule);

