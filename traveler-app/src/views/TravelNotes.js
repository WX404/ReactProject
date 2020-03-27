import React from "react"
import Footer from "../components/Footer.js";

class TravelNotes extends React.Component {
	constructor() {
	    super();
		this.state = {
			
		}
	}
	render() {
		return (
			<div>
                TravelNotes
				<Footer history={this.props.history}/>
			</div>
		)
	}
}

export default TravelNotes;