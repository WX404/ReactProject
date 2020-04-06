import React from "react";
import "../assets/css/Footer.css";
import {
    UserAddOutlined,
    BankOutlined,
    SmileOutlined,
    EditOutlined,
    SyncOutlined,
  } from '@ant-design/icons';


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
                <div onClick={this.toHome.bind(this)}><BankOutlined /></div>
                <div onClick={this.toDiscover.bind(this)}><SyncOutlined /></div>
                <div onClick={this.toTravelNotes.bind(this)}><EditOutlined /></div>
                <div onClick={this.toFriends.bind(this)}><UserAddOutlined /></div>
                <div onClick={this.toUser.bind(this)}><SmileOutlined /></div>
            </div>
        )
    }
}

export default Footer;