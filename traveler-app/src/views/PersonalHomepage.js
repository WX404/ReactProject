import React from "react";

class Friends extends React.Component {
	constructor() {
	    super();
		this.state = {
			
		}
	}
	render() {
		return (
			<div>
                PersonalHomepage
				<Footer history={this.props.history}/>
			</div>
		)
	}
}

export default Friends;