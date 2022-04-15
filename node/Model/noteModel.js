const mongoose = require("mongoose");

const noteRule = new mongoose.Schema({
  note_id: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String },
  type: { type: String },
  date: { type: String, default: new Date().toLocaleString() },
  dateNum: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("note", noteRule);
