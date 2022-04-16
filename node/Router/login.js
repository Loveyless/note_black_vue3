const express = require("express");
const router = express.Router();
const usersModel = require("../Model/usersModel");
const jwt = require("jsonwebtoken");

const jwtKey = "loveyless";

//登录逻辑
router.post("/login", (req, res, next) => {
  const { username, password, _id } = req.body;
  //查找有没有这个用户
  usersModel.findOne(
    {
      username,
      password,
    },
    (err, data) => {
      err && res.json({ status: 400, message: "数据库连接超时_登录查询" });
      if (data == null) {
        //没查到

        res.json({
          status: 400,
          message: "您还未注册",
        });
      } else {
        // 生成token 并且返回
        jwt.sign(
          { username: data.username, _id: String(data._id) }, //传入负载 最好不传密码容易泄露

          jwtKey, //加密私钥

          {
            //传入一些可选参数
            expiresIn: 3600 * 24 * 3999999999, //过期时间
            //or
            //expiresIn: "10 days"
          },

          (err, token) => {
            //还可以传个函数创建成功就返回
            res.json({
              username,
              token: "Bearer " + token,
              _id: data._id,
              status: 200,
              message: "登录成功",
            });
          }
        );
      }
    }
  );
});

//注册逻辑
router.post("/create_user", (req, res, next) => {
  const { username, password } = req.body;

  //查找有没有这个用户
  usersModel.findOne(
    {
      username,
    },
    (err, data) => {
      err && res.json({ status: 400, message: "数据库连接超时_注册查询" });
      if (data == null) {
        //没查到

        usersModel.create(
          {
            username,
            password,
          },
          (err, data) => {
            if (!err) {
              res.json({
                status: 200,
                message: "注册成功",
              });
            } else {
              res.json({
                status: 400,
                message: "数据库连接超时_注册",
              });
            }
          }
        );
      } else {
        //用户已存在
        res.json({
          status: 400,
          message: "用户已存在",
        });
      }
    }
  );
});

module.exports = router;
