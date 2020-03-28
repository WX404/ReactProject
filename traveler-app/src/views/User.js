import React from "react"
import Footer from "../components/Footer.js";
import "../assets/css/User.css";
import defaultphoto from "../assets/img/defaultphoto.jpg";

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: sessionStorage.getItem("username")
		}
	}
	toPersonalHomepage(){
		
	}
	signOut(){
		sessionStorage.removeItem("username")
		this.props.history.push("/")
	}
	render() {
		return (
			<div className="user">
				<div className="user-info">
					<div className="user-nickname" onClick={this.toPersonalHomepage.bind(this)}>
						<p>{this.state.username}</p>
						<p>点击查看个人主页</p>
					</div>
					<div className="user-photo">
						<img src={defaultphoto} alt="" />
					</div>
				</div>
				<div className="user-option">
					<div className="user-addpicture">我的素材</div>
					<div className="user-privateletter">私信</div>
					<div className="user-collection">我的收藏</div>
					<div className="user-security">账号与安全</div>
					<div className="user-setup">设置</div>
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