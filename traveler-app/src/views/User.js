import React from "react";
import $ from "jquery";
import Footer from "../components/Footer.js";
import "../assets/css/User.css";

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nickname: sessionStorage.getItem("nickname"),
			username: sessionStorage.getItem("username"),
			userData: {}
		}
	}
	componentDidMount(){
		let username= this.state.username;
		let that = this;
		$.ajax({
			url: "http://localhost:8000/getUserdata",
			type: "post",
			data: {
				username: username
			},
			success(res){
				console.log(res)
				that.setState({
					userData: res
				})
			}

		})
	}
	toPersonalHomepage(){
		let uid = this.state.userData.id
		this.props.history.push(`/personalhomepage/${uid}`)
	}
	myMaterial(){
		this.props.history.push("/material")
	}
	setUp(){
		let uid = this.state.userData.id;
		this.props.history.push(`/setup/${uid}`)
	}
	signOut(){
		sessionStorage.removeItem("username")
		sessionStorage.removeItem("nickname")
		this.props.history.push("/")
	}
	render() {
		return (
			<div className="user">
				<div className="user-info">
					<div className="user-nickname" onClick={this.toPersonalHomepage.bind(this)}>
						<p>{this.state.nickname}</p>
						<p>点击查看个人主页</p>
					</div>
					<div className="user-photo">
						<img src={this.state.userData.photo_url} alt="" />
					</div>
				</div>
				<div className="user-option">
					<div className="user-material" onClick={this.myMaterial.bind(this)}>我的素材</div>
					<div className="user-privateletter">私信</div>
					<div className="user-collection">我的收藏</div>
					<div className="user-security">账号与安全</div>
					<div className="user-setup" onClick={this.setUp.bind(this)}>设置</div>
					<div className="user-suggestion">建议反馈</div>
					<div className="user-signout" onClick={this.signOut.bind(this)}>退出登录</div>
				</div>
				<div className="user-footer">海上升明月，天涯共此时</div>
				<Footer history={this.props.history} />
			</div>
		)
	}
}

export default User;