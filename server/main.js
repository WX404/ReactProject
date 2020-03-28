const express = require("express");//导入express
const app = express();
app.use(express.static(__dirname+"/public"));//静态文件存放目录 
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
const mysql = require("mysql");
const mydb = mysql.createConnection({
	database: 'traveler',
    host: 'localhost',
	port: 3306,
    user: 'root',
    password: '123456'
})

const path = require('path');//不需要下载, path是属于node.js的内置模块
const upload = require("./multerUtil.js")//用于文件上传



//过滤器, 
app.use("/*", function(req, res, next){
		//设置跨域时，客户端域名
		// res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		res.setHeader("Access-Control-Allow-Origin", "*");
		next();//往下走
})

app.post("/register",(req,res)=>{
	let sql = `select * from  user where username='${req.body.username}'`
	mydb.query(sql,(err,result)=>{
		if(!result.length){
			let sql = `insert into user (username,password) values ('${req.body.username}','${req.body.password}')`
			mydb.query(sql,(err,result)=>{
				if(err){
					console.log(err);
					return
				}
				if(result.affectedRows){
					res.json({
						status: 1,
						msg: "注册成功"
					})
				}
			})
		} else {
			res.json({
				status: 0,
				msg: "用户名已被注册"
			})
		}
	})
})

app.post("/login",(req,res)=>{
	let sql = `select * from  user where username='${req.body.username}'`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result.length == 0){
			res.json({
				status: 1,
				msg: "用户名不存在"
			})
		} else {
			if(result[0].username == req.body.username && result[0].password == req.body.password){
				res.json({
					status: 0,
					msg: "登录成功"
				})
			} else {
				res.json({
					status: 2,
					msg: "账号或密码输入错误"
				})
			}
		}
	})
})

app.listen(8000, function () {
  console.log("running at 8000...");
})



