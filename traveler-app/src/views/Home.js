import React from "react"
// import { Link } from "react-router-dom";
import { Carousel } from 'antd';
import "../assets/css/Home.css";
import Footer from "../components/Footer.js";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    toHotList(){
        this.props.history.push("/hotlist")
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <div>Travelers</div>
                    <div onClick={this.toHotList.bind(this)}>榜单</div>
                </div>

                <Carousel autoplay>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                </Carousel>
                <Footer history={this.props.history}/>
            </div>
        )
    }
}

export default Home;