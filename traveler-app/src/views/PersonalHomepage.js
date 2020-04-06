import React from "react";
import Footer from "../components/Footer.js";
import $ from "jquery";
import "../assets/css/PersonalHomepage.css";

class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uid: props.match.params.uid,
			pageData: [],
			photo: "",
			nickname: "",
			isloading: false
		}
	}
	componentDidMount() {
		let that = this;
		$.ajax({
			url: "http://localhost:8000/getPersonalpageData",
			type: "post",
			data: {
				uid: that.state.uid
			},
			success(res) {
				that.setState({
					pageData: res,
					isloading: true,
					nickname: res[0].nickname,
					photo: res[0].photo_url
				})
			}
		})
	}

	shareList() {
		let imgList = this.state.pageData.reverse()
		let listItems = []
		for (let i = 0; i < imgList.length; i++) {
			listItems.push(<li key={i} className="personal-share-item" onClick={(index)=>this.toSingleImg(imgList[i].id)}>
				<img src={imgList[i].picture_url} alt="" />
				<p className="item-title">{imgList[i].title}</p>
				<p className="item-description">{imgList[i].description}</p>
			</li>)
		}
		return listItems;
	}
	toSingleImg(index){
		let pid = index;
		this.props.history.push(`/singleImg/${pid}`)
	}
	render() {
		return (
			<div className="personal-page">
				<div className="persnoal-bgcolor">
					<div className="personal-photo">
						<img src={this.state.photo} alt=""/>
					</div>					
				</div>
				<div className="personal-title">
					<div className="personal-nickname">{this.state.nickname}</div>
					<span>关注</span>
				</div>
				<div className="personal-share">
					<ul>{this.shareList()}</ul>
				</div>
				<Footer history={this.props.history} />
			</div>
		)
	}
}

export default Friends;