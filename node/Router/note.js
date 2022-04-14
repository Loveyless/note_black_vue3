const express = require('express');
const router = express.Router();
const noteModel = require("../Model/noteModel");


//中间件


// 添加笔记
router.post("/note", (req, res, next) => {


  noteModel.create(
    {
      _id: req.user._id,
      data: { ...req.body },
    },
    (err, data) => {
      !err &&
        res.json({
          status: 200,
          message: "添加成功",
        });
    }
  );
})

module.exports = router