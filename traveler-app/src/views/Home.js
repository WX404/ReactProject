import React from "react";
import { Carousel } from 'antd';
import $ from "jquery";
import "../assets/css/Home.css";
import Footer from "../components/Footer.js";

import lunbotu1 from "../assets/img/lunbotu/01.jpg";
import lunbotu2 from "../assets/img/lunbotu/02.jpg";
import lunbotu3 from "../assets/img/lunbotu/03.jpg";
import lunbotu4 from "../assets/img/lunbotu/04.jpg";

import seek1 from "../assets/img/01.jpg";
import seek2 from "../assets/img/02.jpg";
import seek3 from "../assets/img/03.jpg";
import seek4 from "../assets/img/04.jpg";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            isloading: true,
            picturesData: [],
            pictures: []
        }
    }
    componentDidMount(){
        let that = this;
        $.ajax({
			url: 'http://localhost:8000/getUsershare',
			type: 'post',
			dataType: 'text',			
			success(res) {		                		
                let data = JSON.parse(res);
                for(let i=0; i<data.length; i++){
                    if(data[i].picture_url){
                        that.state.pictures.push(data[i])
                    }                    
                }
                that.setState({
                    isloading: true,
                    picturesData: data
                })                                    
			}
		})
    }
    // toHotList() {
    //     this.props.history.push("/hotlist")
    // }
    toSingleimg(index){
        let pid = index;
        this.props.history.push(`/singleImg/${ pid }`)
    }
    
    recommendList(){
        let imgList = this.state.pictures.slice(0,6)
        let listItems = []
        for(let i=0; i<imgList.length; i++){
            listItems.push(<li key={i}><img src={imgList[i].picture_url} onClick={(index)=>this.toSingleimg(imgList[i].id)} alt=""/></li>)
        }
        return listItems;
    }
    recordLIst(){
        let imgList = this.state.pictures.slice(6,101)
        let listItems = []
        for(let i=0; i<imgList.length; i++){            
            listItems.push(<li key={i}><img src={imgList[i].picture_url} onClick={(index)=>this.toSingleimg(imgList[i].id)} alt=""/></li>)
        }
        return listItems;
    }
    render() {  
        if(this.state.isloading === false){
            return(
                <div className="App">
                <div className="App-header">
                    <div>Travelers</div>
                    {/* <div onClick={this.toHotList.bind(this)}>榜单</div> */}
                </div>
                <div className="home-lunbotu">
                    <Carousel autoplay>
                        <div>
                            <img src={lunbotu1} alt="" />
                        </div>
                        <div>
                            <img src={lunbotu2} alt="" />
                        </div>
                        <div>
                            <img src={lunbotu3} alt="" />
                        </div>
                        <div>
                            <img src={lunbotu4} alt="" />
                        </div>
                    </Carousel>
                </div>          
                <div>Loading...</div>      
                <Footer history={this.props.history} />
            </div>
            )
        }      
        return (
            <div className="App">
                <div className="App-header">
                    <div>Travelers</div>
                    {/* <div onClick={this.toHotList.bind(this)}>榜单</div> */}
                </div>
                <div className="home-lunbotu">
                    <Carousel autoplay>
                        <div>
                            <img src={lunbotu1} alt="" />
                        </div>
                        <div>
                            <img src={lunbotu2} alt="" />
                        </div>
                        <div>
                            <img src={lunbotu3} alt="" />
                        </div>
                        <div>
                            <img src={lunbotu4} alt="" />
                        </div>
                    </Carousel>
                </div>
                <div className="home-main">
                    <div className="home-recommend">
                        <ul>{this.recommendList()}</ul>                        
                    </div>
                    <div className="home-seek">
                        <div>寻找</div>
                        <ul>
                            <li>
                                <img src={seek1} alt=""/>
                            </li>
                            <li>
                                <img src={seek2} alt=""/>
                            </li>
                            <li>
                                <img src={seek3} alt=""/>
                            </li>
                            <li>
                                <img src={seek4} alt=""/>
                            </li>
                        </ul>
                    </div>
                    <div className="home-record">
                        <div>记录</div>
                        <ul>{this.recordLIst()}</ul>
                    </div>
                </div>
                <Footer history={this.props.history} />
            </div>
        )
    }
}

export default Home;