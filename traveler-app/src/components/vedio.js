import React from "react";
import "../assets/css/vedio.css";

class Vedio  extends React.Component {
    constructor(){
        super();
        this.state={
            loginStatus: false
        }
    }
    
    toMei(){
        this.props.history.push("/america");
    }
    render() {
        return (
            <div className="vedio">
                <h3>目的地视频</h3>
                <div onClick={this.toMei.bind(this)}>
                   <img title="美国" src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3853279607,2942280234&fm=26&gp=0.jpg"/>
                </div>
                <div>
                   <img title="韩国" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=234781029,777843450&fm=26&gp=0.jpg"/>
                </div>
                <div>
                   <img title="泰国" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2397004746,3090031502&fm=111&gp=0.jpg"/>
                </div>
                <div>
                   <img title="土耳其" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=858458265,2441784679&fm=26&gp=0.jpg"/>
                </div>
                
            </div>
        )
    }
}

export default Vedio;