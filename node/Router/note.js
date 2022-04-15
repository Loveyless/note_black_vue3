const express = require("express");
const router = express.Router();
const noteModel = require("../Model/noteModel");

//中间件

//获取笔记
router.get("/note", (req, res, next) => {
  noteModel.find(
    {
      note_id: req.user._id,
    },
    (err, data) => {
      !err &&
        res.json({
          message: "笔记获取成功",
          status: 200,
          data: data,
        });

      err &&
        res.json({
          message: "笔记获取失败",
          status: 400,
        });
    }
  );
});

// 添加笔记
router.post("/note", (req, res, next) => {
  noteModel.create(
    {
      note_id: req.user._id,
      ...req.body,
    },
    (err, data) => {
      if (!err) {
        res.json({
          status: 200,
          message: "添加成功",
        });
      } else {
        console.log(err);
        res.json({
          status: 400,
          message: err.message,
        });
      }
    }
  );
});

//删除笔记
router.delete("/note", (req, res, next) => {
  const { dateNum } = req.body;

  noteModel.deleteOne({ dateNum }, (err, data) => {
    !err &&
      res.json({
        message: "删除成功",
        status: 200,
      });
    err &&
      res.json({
        message: "删除失败",
        status: 400,
      });
  });

  res.json();
});

module.exports = router;
