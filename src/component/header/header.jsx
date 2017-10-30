import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import *as action from 'action/fetch-action.js';
import './header.less';

@connect(state => {return {fetchData:state.fetchData}},action)
export default class Header extends Component{
	constructor(props){
		super(props);
		this.state = {showmenu:false};
	}

	static serverRender(store) {
		return action.fetchPosts('http://qqweb.top/API/BlogApi/AdminUser')(store.dispatch);
	}

	//渲染前服务端和客户端都调用
	componentWillMount() {
		this.upPageData(this.props.fetchData || window.__REDUX_DATA__.fetchData);
	}

	upPageData(fetchData){
		if(fetchData && fetchData.Json){
    		let data = fetchData.Json;
			if(data && data.ID > 0){
				this.data = data;
				//return true;
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.fetchData){
    		if(nextProps.fetchData.isFetching) {
    			this.dataloading = true;
    			return false;
    		}
    		this.dataloading = false;
    		this.upPageData(nextProps.fetchData);
    	}
    	return true;
	}

	componentDidMount(){
		if(!Header.serverRender){
			this.props.fetchPosts('http://qqweb.top/API/BlogApi/AdminUser');
		}
	}

	showhome(e){
		if(e.target.className == "searchicon" && !this.state.showmenu)return;
		this.setState({showmenu:!this.state.showmenu});
	}

	render(){
		return (
			<div className = "header" onClick = {this.showhome.bind(this)}>
				<header className = "topbtn">
					<div className = "menuicon" ></div>
					<div className = "blogicon" ></div>
					<Link to="/search" className = "searchicon" ></Link>
				</header>
				<div className = {this.state.showmenu ? "classify show" : "classify"}>
						<div className = "userinfo">
							<div className = "usericon">
								{
									this.data && <img className = "imgfile" src = {'http://qqweb.top' + this.data.AvatarUrl} />
								}
							</div>
							<div className = "usercontent">
								<p className = "name">{this.data ? this.data.NickName : "晨曦沐枫"}</p>
								<p className = "detail">前端工程师</p>
							</div>
						</div>
						<nav className = "nav">
							<ul>
								<li className = "item">
									<div className = "iconbase homegray" ></div>
									<Link to="/home" className = "name" >主页</Link>
								</li>
								<li className = "item">
									<div className = "iconbase bloggray" ></div>
									<Link to="/list" className = "name" >博客</Link>
								</li>
								<li className = "item">
									<div className = "iconbase usergray" ></div>
									<Link to="/me" className = "name" >关于</Link>
								</li>
								<li className = "item">
									<div className = "iconbase emailgray" ></div>
									<Link to="/email" className = "name" >联系</Link>
								</li>
							</ul>
						</nav>
				</div>
			</div>
	    )
	}
} 































