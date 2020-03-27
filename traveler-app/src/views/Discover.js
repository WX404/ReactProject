import React from "react"
import Footer from "../components/Footer.js";

class Discover extends React.Component {
	constructor() {
	    super();
		this.state = {
			
		}
	}
	render() {
		return (
			<div>
                Discover
				<Footer history={this.props.history}/>
			</div>
		)
	}
}

export default Discover;