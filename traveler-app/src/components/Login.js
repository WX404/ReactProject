import React from "react";
import "../assets/css/Login.css";
import $ from "jquery";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}
	toHome(){
		this.props.history.push("/")
	}
	toRegister(){
		this.props.history.push("/register")
	}
	Login(){	
		console.log(this.state.username,this.state.password)
		let that = this;	
		$.ajax({
			url: 'http://localhost:8000/login',
			type: 'post',
			dataType: 'text',
			data: {
				username: that.state.username,
				password: that.state.password
			},
			success(res) {				
				let data = JSON.parse(res)
				if (data.status === 0) {
					sessionStorage.setItem("username",that.state.username)
					//未解决路由传参问题
					that.props.history.push("/user")					
				} else if (data.status === 1) {
					$(".login-username-tip").css("display","block")
				} else if (data.status ===2 ){
					$(".login-password-tip").css("display","block")
				}
			}
		})
		
	}
	inputUsername(e){
		this.setState({username:e.target.value})
	}
	inputPassword(e){
		this.setState({password:e.target.value})
	}
	usernameFocus(){
		$(".login-username-tip").css("display","none")
	}
	pwdFocus(){
		$(".login-password-tip").css("display","none")
	}
	render() {
		return (
			<div className="login">
				<div className="login-title">Hi, Traveler</div>
				<div className="login-not" onClick={this.toHome.bind(this)}>×</div>
				<div className="login-box">
					<div className="login-username">
						<label htmlFor="login-username">用户名</label>
						<input type="text" id="login-username" onChange={(event) => { this.inputUsername(event) }} onFocus={this.usernameFocus.bind(this)}/>
						<div className="login-username-tip">用户名不存在</div>
					</div>
					<div className="login-password">
						<label htmlFor="login-password">密　码</label>
						<input type="text" id="login-password" onChange={(event) => { this.inputPassword(event) }} onFocus={this.pwdFocus.bind(this)}/>
						<div className="login-password-tip">账号或密码错误</div>
					</div>
					<div className="login-btn" onClick={this.Login.bind(this)}>登 录</div>					
				</div>
				<div className="to-register" onClick={this.toRegister.bind(this)}>没有账号？去注册</div>				
				<div className="login-footer">查看用户协议</div>
				<div className="forget-password">忘记密码？</div>
			</div>
		)
	}
}

export default Login;