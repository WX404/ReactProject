const express = require("express");
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path');
const upload = require("./multerUtil.js")

const mysql = require("mysql");
const mydb = mysql.createConnection({
	database: 'traveler',
    host: 'localhost',
	port: 3306,
    user: 'root',
    password: '123456'
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(__dirname+"/public"));//静态文件存放目录 

// 过滤器
app.use("/*", function(req, res, next){	
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	// res.setHeader("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With,userId,token");
	next();
})

//处理favicon.ico
app.get("*", function(req, res) {
    if (req.path === "/favicon.ico") {
        res.json({'status':0, msg:''});
    }   
    throw new PathError();
});

//注册
app.post("/register",(req,res)=>{
	let sql = `select * from  user where username='${req.body.username}'`
	mydb.query(sql,(err,result)=>{
		if(!result.length){
			let sql = `insert into user (username,password,nickname) values ('${req.body.username}','${req.body.password}','${req.body.username}')`
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

//登录
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
					msg: "登录成功",
					userInfo: result[0]
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

//用户头像上传
app.post('/uploaduserphoto', upload.single('fileData'), function(req, res, next) { 
	let filePath = 'http://localhost:8000/uploads/' + path.basename(req.file.path)
	let sql = `select * from user where username='${req.body.username}'`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			let sql = `update user set photo_url='${filePath}' where username='${req.body.username}'`
			mydb.query(sql,(err,result)=>{
				if(err){
					console.log(err);return
				}
				if(result.affectedRows){
					return res.json({filePath});
				}
			})
		}
	})	
});

//修改昵称
app.post("/setupNickname",(req,res)=>{
	let sql = `select * from user where username='${req.body.username}'`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			let sql = `update user set nickname='${req.body.nickname}' where username='${req.body.username}'`
			mydb.query(sql,(err,result)=>{
				if(err){
					console.log(err);return
				}
				if(result.affectedRows){
					res.json({
						status: 0,
						msg: "昵称修改成功"
					})
				}
			})
		}
	})
})

//修改密码
app.post("/setupPassword",(req,res)=>{
	let sql = `select * from user where username='${req.body.username}'`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			let sql = `update user set password='${req.body.password}' where username='${req.body.username}'`
			mydb.query(sql,(err,result)=>{
				if(err){
					console.log(err);return
				}
				if(result.affectedRows){
					res.json({
						status: 0,
						msg: "昵称修改成功"
					})
				}
			})
		}
	})
})

//获取用户信息
app.post("/getUserdata",(req,res)=>{
	let sql = `select * from user where username='${req.body.username}'`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			res.json(result[0])	
		}
	})
})

//分页查询获取用户列表
app.post("/getUserlist",(req,res)=>{
	// let pageIndex = req.body.pageIndex
	let limitPage = req.body.pageIndex*req.body.pageSize;
	let sql = `select * from user limit ${limitPage},${req.body.pageSize}`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			res.json(result)	
		}
	})
})

//多表查询，获取usershare
app.post("/getUsershare",(req,res)=>{
	let sql = `select user.nickname,user.photo_url,usershare.* from user inner join usershare on user.id=usershare.user_id`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			res.json(result)
		}
	})
})

//获取详情页信息
app.post("/getSingleimg",(req,res)=>{
	let sql = `select user.nickname,user.photo_url,usershare.* from user inner join usershare on user.id=usershare.user_id and usershare.id='${req.body.pid}'`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			let imgData = result
			let sql = `select * from comment where usershare_id='${req.body.pid}'`
			mydb.query(sql,(err,result)=>{
				if(err){
					console.log(err);return
				}
				if(result){
					let commentData = result;
					let newArr = imgData.concat(commentData)
					res.json(newArr)
				}
			})
			
		}
	})
})

//用户发布的游记/照片路径保存到数据库，照片上传到服务器
app.post('/uploadTravelnotes', upload.single('imgData'), function(req, res, next) {
	let filePath = 'http://localhost:8000/uploads/' + path.basename(req.file.path)
		let sql = `select * from user where username='${req.body.username}'`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			let user_id = result[0].id
			let sql = `insert into usershare (picture_url,description,user_id) values ('${filePath}','${req.body.text}','${user_id}')`
			mydb.query(sql,(err,result)=>{
				if(err){
					console.log(err);return
				}
				if(result.affectedRows){
					res.json({
						status: 0,
						msg: "上传成功"
					})
					
				}
				
			})
		}
	})
});

//保存评论
app.post("/commentRelease",(req,res)=>{
	let sql = `select * from user where username='${req.body.username}'`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			let uid = result[0].id
			let sql = `insert into comment (comment,time,usershare_id,user_id) values ('${req.body.comment}','${req.body.commentTime}','${req.body.pid}','${uid}')`
			mydb.query(sql,(err,result)=>{
				if(err){
					console.log(err);return
				}
				if(result.affectedRows){
					res.json({
						status: 0,
						msg: "发送成功"
					})
				}
			})
		}
	})
})

//多表查询，获取PersonalHomepage数据
app.post("/getPersonalpageData",(req,res)=>{
	
	let sql = `select user.nickname,user.photo_url,usershare.* from user inner join usershare on user.id=usershare.user_id and user.id=${req.body.uid}`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			res.json(result)
		}
	})
})
// 获取更多视频
app.post("/getMorevedio",(req,res)=>{
	let sql = `select morevedio.video_url from morevedio`
	mydb.query(sql,(err,result)=>{
		if(err){
			console.log(err);return
		}
		if(result){
			res.json(result)
		}
	})
})

app.listen(8000, function () {
  console.log("running at 8000...");
})



