import React from "react";
import "../assets/css/Footer.css";


class Footer extends React.Component {
    constructor(){
        super();
        this.state={
            loginStatus: false
        }
    }
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
        console.log()
        let username = sessionStorage.getItem("username")
        if(username){
            this.props.history.push("/user");
        }else{
            this.props.history.push("/login");
        }
        
        // if(!this.state.loginStatus){
        //     this.props.history.push("/login");
        // }else{
        //     this.props.history.push("/user");
        // }
        
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