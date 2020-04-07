import React from "react";
import "../assets/css/Tu.css";
import $ from "jquery";


class Han extends React.Component {
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
                <h3 className="name">韩国</h3>
                <p className="txt">我们的邻居韩国，拥有着传统与现代完美交织的文化。你可以在这里找到最传统的建筑与宫殿，尝试穿着韩服拍照，或看到传统的歌舞表演。也可以在这里感受最前沿的亚洲潮流文化，耀眼的演艺巨星，还有令人着迷的现代艺术。
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

export default Han;