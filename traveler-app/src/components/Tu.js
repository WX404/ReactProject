import React from "react";
import "../assets/css/Tu.css";
import $ from "jquery";

class Tu extends React.Component {
    constructor() {
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
        return (
            <div className="jj">
                <div className="mm">
                    <video width="100%" height="240" controls="controls"><source src="https://haokan.baidu.com/v?vid=6834010308109960146&pd=bjh&fr=bjhauthor&type=video" type="video/mp4" />您的浏览器不支持video标签</video>
                </div>
                <div className="descript">
                    <h3 className="name">特洛伊的兴衰在此见证</h3>
                    <p className="txt">土耳其共和国简称土耳其，是一个横跨欧亚两洲的国家，是连接欧亚的十字路口。独特的地理位置，宜人的气候条件使土耳其成为游人向往的乐园。形状各异的现代化建筑，华丽肃穆的清真寺唤礼塔,飞跃于博斯普鲁斯海峡之.上的跨海大桥，《荷马史诗》 中的特洛伊城遗址，世界奇景卡帕多西亚，观鸟胜地库什湖，秀美的亚洛瓦温泉.... .迷人的自然风光，丰富的文物古迹使土耳其享有"旅游天堂”之誉。
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

export default Tu;