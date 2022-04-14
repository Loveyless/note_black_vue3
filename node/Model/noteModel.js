const mongoose = require("mongoose");

const xxxRule = new mongoose.Schema({
  _id: String,
  data: [
    {
      title: { type: String, required: true },
      text: { type: String },
      type: { type: String },
      date: { type: String, default: new Date().toLocaleString() },
      dateNum: { type: Number, default: Date.now() },
    },
  ],
});

//这里添加涉及到数组 明天再弄一下

module.exports = mongoose.model("xxx", xxxRule);
