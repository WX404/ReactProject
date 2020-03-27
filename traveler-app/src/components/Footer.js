import React from "react";
import "../assets/css/Footer.css";


class Footer extends React.Component {
    
    toHome() {
        this.props.history.push("/");
    }
    toDiscover() {
        this.props.history.push("/discover");
    }
    toTravelNotes() {
        this.props.history.push("/travelnotes");
    }
    toFriends() {
        this.props.history.push("/friends");
    }
    toUser() {
        
        this.props.history.push("/user");
    }
    render() {
        return (
            <div className="App-footer">
                <div onClick={this.toHome.bind(this)}>首页</div>
                <div onClick={this.toDiscover.bind(this)}>发现</div>
                <div onClick={this.toTravelNotes.bind(this)}>发布</div>
                <div onClick={this.toFriends.bind(this)}>朋友</div>
                <div onClick={this.toUser.bind(this)}>用户</div>
            </div>
        )
    }
}

export default Footer;