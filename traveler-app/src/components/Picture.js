import React from "react";
import "../assets/css/Picture.css";

class Picture extends React.Component {

    constructor(props) {
        super();
        
        // 定义图片数组：定义为属性，固定的，不可变的
        this.imgArr = [
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1454958945,1145093845&fm=26&gp=0.jpg",
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=724719364,3269052597&fm=26&gp=0.jpg",
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2543827251,1669447134&fm=26&gp=0.jpg",
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3769182427,1944681950&fm=26&gp=0.jpg",
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1753427096,2012934379&fm=26&gp=0.jpg"
        ]

        // 定义状态，根据下标变化显示不同的图片
        this.state = {
            index: 4
        }
        
        // 定时器开启自动轮播
        setInterval(()=> {
            this.setState({
                index: this.state.index==this.imgArr.length-1 ? 0 : ++this.state.index
            })
        }, 2000)
    }

    // 上一张
    leftPicture() {
        this.setState({
            index: this.state.index==0 ? this.imgArr.length-1 : this.state.index-1
        })
    }

    // 下一张
    rightPicture() {
        this.setState({
            index: this.state.index==this.imgArr.length-1 ? 0 : ++this.state.index
        })
    }

    render() {
        return(
            <div className="container">
                <button className="arrow left" onClick={this.leftPicture.bind(this)}>&lt;</button>
                <button className="arrow right" onClick={this.rightPicture.bind(this)}>&gt;</button>
                <img className="myImg" src={this.imgArr[this.state.index]}/>
            </div>
        )
    }
}

export default Picture;