import React from "react";
import "../assets/css/Piclist.css";

class Piclist extends React.Component {
    constructor(){
        super();


    }

    render() {
        return(
           <div className="box">
               <div className="pp">
                <a><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1435970909,445848727&fm=26&gp=0.jpg"/><p>视频对战</p></a>
                <a><img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=221117227,3217787018&fm=15&gp=0.jpg"/><p>TOP旅行者</p></a>
                <a><img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1922929739,3431643747&fm=26&gp=0.jpg"/><p>旅镜独播</p></a>
                <a><img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1308289469,648660543&fm=15&gp=0.jpg"/><p>旅行聚焦</p></a>
                <a><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1570475829,1255820589&fm=26&gp=0.jpg"/><p>旅行者头条</p></a>
                <a><img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3648428943,3508993359&fm=26&gp=0.jpg"/><p>旅行者直播</p></a>
                <a><img src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2562384559,3096240796&fm=115&gp=0.jpg"/><p>每周精选</p></a>
               </div>
           </div>
        )
    }
}

export default Piclist;