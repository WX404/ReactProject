import React from "react";
import Footer from "../components/Footer.js";
import { Input } from 'antd';
import "../assets/css/TravelNotes.css";
import PicturesWall from "../components/uploadPictures.js";

const { TextArea } = Input;

class TravelNotes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ""			
		}
	}
	Write(e) {
		this.setState({
			value: e.target.value
		})	
	}
	
	render() {
		return (
			<div className="travelnote">
				<div >
					<p>分享游记</p>
					<TextArea rows={6} value={this.state.value} onChange={(event) => { this.Write(event) } } />
				</div>
				<div className="travelnote-pictitle"> 
					<p>上传图片</p>
					<PicturesWall textValue={this.state.value}/>
				</div>				
				<div className="release-tip">发布成功</div>
				<Footer history={this.props.history} />
			</div>
		)
	}
}

export default TravelNotes;