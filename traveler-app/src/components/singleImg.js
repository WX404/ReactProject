import React from "react";
import $ from "jquery";
import "../assets/css/singleImg.css";
import { Input } from 'antd';

const { TextArea } = Input;

class singleImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: props.match.params.pid,
            imgData: {},
            comment: "",
            commentList:[]
        }
    }
    componentDidMount() {
        let that = this;
        $.ajax({
            url: "http://localhost:8000/getSingleimg",
            type: "post",
            data: {
                pid: that.state.pid
            },
            success(res) {
                that.setState({
                    imgData: res
                })
            }
        })        
    }
    toHome(){
        this.props.history.push("/")
    }
    Comment(e){
        this.setState({
            comment: e.target.value
        })
    }
    commentRelease(){        
        let username = sessionStorage.getItem("username")
        let nickname = sessionStorage.getItem("nickname")
        let comment = this.state.comment
        let pid = this.state.pid
        let time = new Date()
        let commentTime = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()
        let that = this;
        if(comment){
            $.ajax({
                url: "http://localhost:8000/commentRelease",
                type: "post",
                data: {
                    username: username,
                    comment: comment,
                    pid: pid,
                    commentTime: commentTime
                },
                success(res){
                    let arr = []
                    arr.push({nickname:nickname,comment:comment,time:commentTime})
                    that.setState({
                        commentList: arr,
                        comment: ""
                    })
                }
                
            })
        } else {
            $(".comment-tip").css("display","block")
            setTimeout(()=>{
                $(".comment-tip").css("display","none")
            },1000)
        }
        
    }
    commentList(){
        let commentList = this.state.commentList;
        let listItems = []
        for(let i=0; i<commentList.length; i++){
            listItems.push(<div key={i}><p>{sessionStorage.getItem("nickname")}</p>
                            <div className="comment-text">{this.state.commentList[i].comment}</div>
                            <p>{this.state.commentList[i].time}</p>
                            <hr/>
                            </div>)
        }
        return listItems
    }
    toPersonalpage(){
        let uid = this.state.imgData.user_id
        this.props.history.push(`/personalhomepage/${uid}`)
    }
    render() {
        if (this.state.isloading === false) {
            return (
                <div>loading</div>
            )
        }
        return (
            <div className="singleimg">
                <div className="singleimg-back" onClick={this.toHome.bind(this)}>返回</div>
                <div className="singleimg-img">
                    <img src={this.state.imgData.picture_url} alt="" />
                </div>
                <div className="singleimg-title">{this.state.imgData.title}</div>
                <div className="singleimg-user" onClick={this.toPersonalpage.bind(this)}>
                    <img src={this.state.imgData.photo_url} alt=""/>
                    <span>{this.state.imgData.nickname}</span>                    
                </div>
                <div className="singleimg-description">{this.state.imgData.description}</div>
                <div className="singleimg-comment">
                    <p>评论</p>
                    <TextArea onChange={(event)=>{this.Comment(event)}}/>
                    <div className="comment-release" onClick={this.commentRelease.bind(this)}>发布</div>                    
                    <div className="comment-tip">内容不能为空</div>
                </div>
                <div className="commentlist">{this.commentList()}</div>        
            </div>
        )
    }
}

export default singleImg;