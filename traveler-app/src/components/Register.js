import React from "react";
import "../assets/css/Register.css";
import $ from "jquery";

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "请输入用户名",
			password: "请输入密码",
			repwd: "请再次输入密码"
		}
	}
	toHome() {
		this.props.history.push("/")
	}
	Register() {
		let that = this;
		if (that.state.username.length >= 2) {
			if (that.state.password.length >= 6 && that.state.password.length <= 18) {
				if (that.state.password === that.state.repwd) {
					$.ajax({
						url: 'http://localhost:8000/register',
						type: 'post',
						dataType: 'text',
						data: {
							username: that.state.username,
							password: that.state.password
						},
						success(res) {
							let data = JSON.parse(res)
							if (data.status === 1) {
								that.props.history.push({pathname:"/login",state:{username:that.state.username}})								
							} else if (data.status === 0) {
								console.log(data.msg)
							}
						}
					})
				}
			}
		}
	}
	toLogin() {
		this.props.history.push("/login")
	}

	usernameFocus() {
		if (this.state.username === "请输入用户名") {
			this.setState({
				username: ""
			})
		}
	}
	pwdFocus() {
		if (this.state.password === "请输入密码") {
			this.setState({
				password: ""
			})
		}
	}
	repwdFocus() {
		if (this.state.repwd === "请再次输入密码") {
			this.setState({
				repwd: ""
			})
		}
	}
	usernameBlur() {
		if (this.state.username.length < 2) {
			$(".register-username-tip").css("display", "block")
		} else {
			$(".register-username-tip").css("display", "none")
		}
	}
	pwdBlur() {
		if (this.state.password.length < 4) {
			$(".register-password-tip").css("display", "block")
		} else {
			$(".register-password-tip").css("display", "none")
		}
	}
	repwdBlur() {
		if (this.state.repwd.length < 4) {
			$(".register-re-password-tip").css("display", "block")
		} else {
			$(".register-re-password-tip").css("display", "none")
		}
	}
	changeName(e) {
		this.setState({
			username: e.target.value
		})
		$("#register-username").css("color", "black")
	}
	changePwd(e) {
		this.setState({
			password: e.target.value
		})
		$("#register-password").css("color", "black")
	}
	rePwd(e) {
		this.setState({
			repwd: e.target.value
		})
		$("#register-re-password").css("color", "black")
	}
	render() {
		return (
			<div className="register">
				<div className="register-title">Welcome</div>
				<div className="register-not" onClick={this.toHome.bind(this)}>×</div>
				<div className="register-box">
					<div className="register-username">
						<label htmlFor="register-username">用户名</label>
						<input type="text" id="register-username" value={this.state.username} onChange={(event) => { this.changeName(event) }} onFocus={this.usernameFocus.bind(this)} onBlur={this.usernameBlur.bind(this)} />
						<p className="register-username-tip">用户名长度不小于2位</p>
					</div>
					<div className="register-password">
						<label htmlFor="register-password">密　码</label>
						<input id="register-password" value={this.state.password} onChange={(event) => { this.changePwd(event) }} onFocus={this.pwdFocus.bind(this)} onBlur={this.pwdBlur.bind(this)} />
						<p className="register-password-tip">密码需6-18位</p>
					</div>
					<div className="register-re-password">
						<label htmlFor="register-re-password">确　认</label>
						<input id="register-re-password" value={this.state.repwd} onChange={(event) => { this.rePwd(event) }} onFocus={this.repwdFocus.bind(this)} onBlur={this.repwdBlur.bind(this)} />
						<p className="register-re-password-tip">两次密码输入不一致</p>
					</div>
					<div className="register-btn" onClick={this.Register.bind(this)}>注 册</div>
				</div>
				<div className="to-login" onClick={this.toLogin.bind(this)}>回到登录页面</div>
				<div className="register-footer">查看用户协议</div>
			</div>
		)
	}
}

export default Register;