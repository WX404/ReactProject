import React from "react";
import Footer from "../components/Footer.js";
import { List, Avatar } from 'antd';
import "../assets/css/Friends.css";
import $ from "jquery";

class Friends extends React.Component {
	constructor() {
		super();
		this.state = {
			initLoading: true,    // 初始加载
			loading: false,    //  加载数据时的下载显示
			data: [],    // 数据
			list: [],  // 渲染用户列表
			pageIndex: 0,
			pageSize: 5
		}
	}

	//页面加载时更新数据
	componentDidMount() {
		this.getData(res => {
			this.setState({
				initLoading: false,
				data: res,
				list: res
			});
		});
	}

	// 获取后端数据
	getData = callback => {
		let pageSize = this.state.pageSize;
		let pageIndex = this.state.pageIndex
		callback()
		$.ajax({
			url: "http://localhost:8000/getUserlist",
			type: "post",
			data: {
				pageIndex: pageIndex,
				pageSize: pageSize
			},
			success(res) {
				callback(res)
			}
		})
	}

	// 点击换一比用户时  调用此方法重新获得数据
	changeUser = () => {
		let currentPage = this.state.pageIndex;
		this.setState({
			loading: true,
			pageIndex: currentPage+1,
			list: this.state.data.concat([...new Array()].map(() => ({ loading: true, name: {} }))) //更新list数据
		});
		this.getData(res => {			
			// 将后端获取来的数据重新赋值给data,换一批用户显示
			const data = res;
			this.setState(
				{
					data,
					list: data,
					loading: false,
				},
				() => {
					window.dispatchEvent(new Event('resize'));   //列表自适应window页面大小
				},				
			);
			if(this.state.list.length<5){
				this.setState({
					pageIndex: 0
				})
			}
			
		});
	};

	toPersonalpage(index) {
		let uid = index
		this.props.history.push(`/personalhomepage/${uid}`)
	}
	
	render() {
		return (
			<div>
				<div className="pageHeader">猜你喜欢</div>
				<div className="friends">
					<List
						itemLayout="horizontal"
						dataSource={this.state.data}
						renderItem={item => (
							<List.Item
								actions={[<a key="list-loadmore-edit">关注</a>]}>
								<List.Item.Meta
									avatar={<Avatar src={item.photo_url} />}
									// 点击跳转到个人主页  换下面的href路径即可
									title={<span onClick={(index)=>this.toPersonalpage(item.id)}>{item.nickname}</span>}
								/>
							</List.Item>
						)}
					/>
				</div>

				<div className="changeUser">
					<button onClick={this.changeUser.bind(this)}>换一批</button>
				</div>
				<Footer history={this.props.history} />
			</div>
		)
	}
}

export default Friends;