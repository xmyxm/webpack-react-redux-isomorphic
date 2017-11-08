import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import {withRouter} from "react-router-dom";
import {fetchPosts} from './detail_action.js';
import {connect} from 'react-redux';
import DateTool from 'utils/date-format.js';
import Cube from '../animation/cube.jsx';
import './detail.less';

@connect(state => {return {fetchData:state.DetailData}},{fetchPosts})
class Detail extends Component{
	constructor(props){
		super(props);
	}

	static serverRender(store,url) {
		let id = url.replace(/\D/g,'');
		return fetchPosts('http://qqweb.top/API/BlogApi/Detail',{id:id})(store.dispatch);
	}

	//在第一次渲染后调用，只在客户端
	componentDidMount(){
		//let id = (window.location.hash || window.location.pathname).replace(/\D/g,'');
		if (!Detail.serverRender || !this.props.fetchData.Json) {
			let params = this.props.match.params;
			this.props.fetchPosts('http://qqweb.top/API/BlogApi/Detail',{id:params.id});
		}
	}

	createMarkup(html) {
		//方便测试，图片路径补全
		html = html.replace(/\/UploadFile\/contentImg\//g,'http://qqweb.top/UploadFile/contentImg/');
	  return {__html: html};
	}

	render(){
		let data = this.props.fetchData.Json;
		return (
			 <div className = "detailbox">
				{
					data &&
					<div className = "contentarea" >
						<div className = "title">
							<div className = "text">{data.DetailContent.Title}</div>
							<div className = "option">写于 {DateTool.ChangeDateFormat(data.DetailContent.CreateTime)} | 分类于 {data.DetailContent.SortName}</div>
				 		</div>
					 	<div className = "content" dangerouslySetInnerHTML={this.createMarkup(decodeURIComponent(data.DetailContent.Content))}></div>
					 	<div className = "tag">
					 		<span className = "mr6">我的标签: </span>
						 	{
						 		data.DetailContent.Tag.replace(/^;+|;+$/g,"").split(";").map((item,index) => {
						 			return <span key = {index} className = "text">{item}</span>
						 		})
						 	}
					 	</div>
					 	<div className = "uptime">
					 		修改于 {DateTool.Format(data.DetailContent.UpdateTime,"yyyy年MM月dd日 hh:mm:ss")}
					 	</div>
					</div>
				}
				{
					!data && <Cube />
				}
			 </div>
	    )
	}
} 

export default withRouter(Detail)





