import React from "react"
import Footer from "../components/Footer.js";
import Picture from "../components/Picture.js";
import Piclist from "../components/Piclist.js";
import Vedio from "../components/vedio.js";

class Discover extends React.Component {
	constructor() {
	    super();
		this.state = {
			
		}
	}
	render() {
		return (
			<div>
                <Picture/>
				<Piclist/>
				<Vedio/>
				<Footer history={this.props.history}/>
			</div>
		)
	}
}

export default Discover;