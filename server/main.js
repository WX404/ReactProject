const express = require("express");//导入express
const app = express();
app.use(express.static(__dirname+"/public"));//静态文件存放目录 
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

const path = require('path');//不需要下载, path是属于node.js的内置模块
const upload = require("./multerUtil.js")//用于文件上传

//过滤器, 
app.use("/*", function(req, res, next){
		//设置跨域时，客户端域名
		// res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		res.setHeader("Access-Control-Allow-Origin", "*");
		next();//往下走
})



app.listen(8000, function () {
  console.log("running at 8000...");
})



