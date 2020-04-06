import React from "react"
import Footer from "./Footer.js";

class Material extends React.Component {
	constructor() {
	    super();
		this.state = {
			
		}
	}
	render() {
		return (
			<div>
                Material
				<Footer history={this.props.history}/>
			</div>
		)
	}
}

export default Material;