import React from "react"
import Footer from "../components/Footer.js";

class User extends React.Component {
	constructor() {
	    super();
		this.state = {
			
		}
	}
	render() {
		return (
			<div>
                User
				<Footer history={this.props.history}/>
			</div>
		)
	}
}

export default User;