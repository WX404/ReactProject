import React from "react";
import $ from "jquery";
import "../assets/css/Setup.css";
import { LeftOutlined } from '@ant-design/icons';

class Setup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.match.params.uid,
            userData: {},
            fileList: null,
            nicknameValue: "",
            pwdValue: ""
        }
    }
    toUser() {
        this.props.history.push("/user")
    }
    componentDidMount() {
        let username = sessionStorage.getItem("username");
        let that = this;
        $.ajax({
            url: "http://localhost:8000/getUserdata",
            type: "post",
            data: {
                username: username
            },
            success(res) {
                that.setState({
                    userData: res
                })
            }
        })
    }
    uploadPhoto() {
        $(".setup-input-photo").click();
    }

    inputChange() {
        let uploadBtn = $(".setup-input-photo")[0];
        let filePath = URL.createObjectURL(uploadBtn.files[0]);
        $(".userphoto").attr('src', filePath);
        this.setState({
            fileList: uploadBtn.files
        })
    }
    setupPhoto() {
        let imgList = this.state.fileList[0];
        let username = sessionStorage.getItem("username")
        let formData = new FormData();
        formData.append("fileData", imgList);
        formData.append("username", username)
        $.ajax({
            url: 'http://localhost:8000/uploaduserphoto',
            type: 'post',
            dateType: 'text',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                $(".setup-photo-tip").css("display", "block")
                setTimeout(() => {
                    $(".setup-photo-tip").css("display", "none")
                }, 1000)
            }
        })
    }
    inputNickname(e) {
        this.setState({
            nicknameValue: e.target.value
        })
    }
    setupNickname() {
        if (this.state.nicknameValue) {
            let that = this;
            $.ajax({
                url: "http://localhost:8000/setupNickname",
                type: "post",
                data: {
                    username: sessionStorage.getItem("username"),
                    nickname: that.state.nicknameValue
                },
                dataType: "text",
                success(res) {                    
                    $(".setup-nickname-success").css("display", "block")
                    setTimeout(() => {
                        $(".setup-nickname-success").css("display", "none")
                        $("#setup-nickname").val("");
                    }, 1000)
                }
            })
        } else {
            $(".setup-nickname-tip").css("display", "block")
            setTimeout(() => {
                $(".setup-nickname-tip").css("display", "none")
            }, 1000)
        }
    }
    inputPassword(e) {
        this.setState({
            pwdValue: e.target.value
        })
    }
    setupPassword() {
        if (this.state.pwdValue.length >= 6 && this.state.pwdValue.length <= 16) {
            let that = this;
            $.ajax({
                url: "http://localhost:8000/setupPassword",
                type: "post",
                data: {
                    username: sessionStorage.getItem("username"),
                    password: that.state.pwdValue
                },
                dataType: "text",
                success() {
                    $(".setup-password-success").css("display", "block")
                    setTimeout(() => {
                        $(".setup-password-success").css("display", "none")
                        $("#setup-password").val("");
                    }, 1000)
                }
            })
        } else {
            $(".setup-password-tip").css("display", "block")
            setTimeout(() => {
                $(".setup-password-tip").css("display", "none")
            }, 1000)
        }
    }
    
    render() {
        return (
            <div className="setup">
                <div className="setup-top">
                    <div className="setup-title">设置</div>
                    <div className="setup-goback" onClick={this.toUser.bind(this)}>
                        <div className="icons-list">
                            <LeftOutlined />
                        </div>
                    </div>
                </div>
                <div className="setup-photo">
                    <div className="setup-photo-select" onClick={this.uploadPhoto.bind(this)}>上传头像</div>
                    <form className="setup-photo-form" encType='multipart/form-data' method='post'>
                        <input type="file" className="setup-input-photo" onChange={this.inputChange.bind(this)} />
                    </form>
                    <div className="setup-btn" onClick={this.setupPhoto.bind(this)}>确认上传</div>
                    <img src={this.state.userData.photo_url} className="userphoto" alt="" />
                    <div className="setup-photo-tip">上传成功</div>
                </div>
                <div className="setup-box">
                    <div className="setup-nickname">
                        <label htmlFor="setup-nickname">修改昵称</label>
                        <input type="text" id="setup-nickname" onChange={(event) => { this.inputNickname(event) }}/>
                        <div className="setup-nickname-tip">昵称已被占用</div>
                        <div className="setup-nickname-success">修改成功</div>
                        <div className="setup-btn" onClick={this.setupNickname.bind(this)}>确认修改</div>
                    </div>
                    <div className="setup-password">
                        <label htmlFor="setup-password">修改密码</label>
                        <input type="text" id="setup-password" onChange={(event) => { this.inputPassword(event) }} />
                        <div className="setup-password-success">修改成功</div>
                        <div className="setup-password-tip">密码需6-18位数字/字母</div>
                        <div className="setup-btn" onClick={this.setupPassword.bind(this)}>确认修改</div>
                    </div>
                </div>
                <div className="setup-forget-password">忘记密码？</div>
            </div>
        )
    }
}

export default Setup;