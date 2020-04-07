import React from "react";
import "../assets/css/Tu.css";
import $ from "jquery";

class Tai extends React.Component {
    constructor(){
        super();
        this.state = {
            isloading: true,
            vediosData: [],
            vedios:[]			
            // isloading: true,
            // picturesData: [],
            // pictures: []
		}
    }
    componentDidMount(){
        let that = this;
        $.ajax({
			url: 'http://localhost:8000/getMorevedio',
			type: 'post',
			dataType: 'text',			
			success(res) {		                		
                let data = JSON.parse(res);
                for(let i=0; i<data.length; i++){
                    if(data[i].video_url){
                        that.state.vedios.push(data[i])
                    }                    
                }
                that.setState({
                    isloading: true,
                    vediosData: data
                })                                    
			}
		})
    }
    recordLIst(){
        let vcdList = this.state.vedios
        let listItems = []
        for(let i=0; i<vcdList.length; i++){            
            listItems.push(<video key={i} width="100%" height="240" controls="controls"><source src={vcdList[i].video_url} type="video/mp4" />您的浏览器不支持video标签</video>)
        }
        return listItems;
    }
    moreVedio(){
        document.getElementById("vd").style.display="block";
    }
    render() {
        return(
            <div className="jj">
            <div className="mm">
                <video width="100%" height="240" controls="controls"><source src="https://haokan.baidu.com/v?vid=6834010308109960146&pd=bjh&fr=bjhauthor&type=video" type="video/mp4" />您的浏览器不支持video标签</video>
            </div>
            <div className="descript">
                <h3 className="name">星条旗下的繁华</h3>
                <p className="txt">美国，北美洲中部的超级大国，世界国土面积第四大的国家。北部与加拿大接壤，南部毗邻墨西哥。东、西岸临海,两条狭长的海岸线散落着美国最繁华的各城市。
                    美国的潮流与文化深深影响着整个世界，好莱坞电影、NBA篮球赛、迪士尼乐园、麦当劳与肯德基，这些标志性的美国代表早已被游客所熟知。各城市数不尽的地标、
                    不重样的国家公园、超值的购物选择以及绝美的自驾公路吸引着全球游客的目光。无论你喜爱东部大城市的繁华，还是想品味西岸海边的潇洒，这个自由的国度,定能
                    让你感受到无尽的美国之“美”,留下一段非凡的北美记忆
                </p>
            </div>
            <button className="morevedio" onClick={this.moreVedio.bind(this)}>更多视频</button>
                <div id="vd">
                    <div>{this.recordLIst()}</div>
                </div>
        </div>
        )
    }
}

export default Tai;