import React from "react";
import "../assets/css/Footer.css";


class Footer extends React.Component {
    constructor(){
        super();
        this.state={
            
        }
    }
    toHome() {
        this.props.history.push("/");
    }
    toDiscover() {
        this.props.history.push("/discover");
    }
    toTravelNotes() {
        let username = sessionStorage.getItem("username")
        if(username){
            this.props.history.push("/travelnotes");
        }else{
            this.props.history.push("/login");
        }        
    }
    toFriends() {
        this.props.history.push("/friends");
    }
    toUser() {
        let username = sessionStorage.getItem("username")
        if(username){
            this.props.history.push("/user");
        }else{
            this.props.history.push("/login");
        }
        
        
        
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