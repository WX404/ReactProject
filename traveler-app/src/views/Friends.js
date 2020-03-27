import React from "react"
import Footer from "../components/Footer.js";

class Friends extends React.Component {
	constructor() {
	    super();
		this.state = {
			
		}
	}
	render() {
		return (
			<div>
                Friends
				<Footer history={this.props.history}/>
			</div>
		)
	}
}

export default Friends;