
//整个写入的逻辑 不拆db模块

const express = require("express");
const mongoose = require("mongoose");
const app = express();
//跨域
app.all("*", (req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken"); res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization"); res.setHeader("Content-Type", "application/json;charset=utf-8"); res.header( "Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With" ); res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); res.header("X-Powered-By", " 3.2.1"); if (req.method == "OPTIONS") res.sendStatus(200); /*让options请求快速返回*/ else next(); });
//解析json urlencoded
app.use(express.json()); app.use(express.urlencoded({ extended: true }));



//引入jwt
const jwt = require("jsonwebtoken");
//jwt私钥
const jwtKey = "loveyless";

//连接数据库
new Promise((resolve, reject) => {
  mongoose.connect("mongodb://localhost:27017/token_test", (err, res) => {
    !err && resolve();
    err && reject(err);
  });
}).then(
  () => {
    console.log("mongo_true");

    //登陆逻辑
    app.post("/", (req, res) => {
      const { username, password } = req.body;

      // // 生成token 4个参数
      jwt.sign(
        { username: username }, //传入负载 最好不传密码容易泄露

        jwtKey, //加密私钥 随便写或者使用crypto

        {
          //传入一些可选参数
          expiresIn: 3600 * 24 * 3, //过期时间
          //or
          //expiresIn: "10 days"
        },

        (err, token) => {
          //还可以传个函数
          res.json({
            username,
            password,
            // token: "Bearer " + token, //token一般以"Bearer " Bearer加空格开始
            token,
          });
        }
      );

      //两种写法
      const token = jwt.sign(
        {
          username,
        },
        jwtKey, //私匙
        {
          expiresIn: 3600 * 24 * 3, //过期时间
          //or
          //expiresIn: "10 days"
        }
      );
      res.json({
        username,
        password,
        token,
      });
    });

    //进入主页
    app.get("/home", (req, res, next) => {
      const token = req.headers["authorization"].split(" ")[1];

      //jsonwebtoken自带的验证token也可以用express-jwt
      //参数( token, 私钥, (err, jwt生成的负载)=>{})
      jwt.verify(token, jwtKey, (err, payload) => {
        if (err) {
          res.sendStatus(403);
        }
        res.json({ message: "成功", payload });
      });
    });
  },
  (err) => {
    console.log("mongo_false", err);
  }
);

app.listen(9999, (err) => {
  !err && console.log("node true");
  err && console.log("node err", err.message);
});
