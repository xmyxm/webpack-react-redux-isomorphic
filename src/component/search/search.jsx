import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {fetchPosts} from './search_action.js';
import {connect} from 'react-redux';
import DateTool from 'utils/date-format.js';
import Eat from '../animation/eat.jsx';
import './search.less';

@connect(state => {return {fetchData:state.SearchData}},{fetchPosts})
export default class Search extends Component{
	constructor(props){
		super(props);
	}

	static serverRender(store,url) {
		return fetchPosts('http://qqweb.top/API/BlogApi/Query',{PageIndex:1,key:''})(store.dispatch);
	}

	componentWillUnmount() {
		window.onscroll = null;
	}

    componentDidMount(){
    	let _self = this;
		window.onscroll = (e) => { 
            if (!_self.props.fetchData.imgLoading || _self.props.fetchData.isFetching) return;
            let alltop = (document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight + 150;
            if (alltop > document.body.scrollHeight) {
                _self.pullBlogData();
            }
        }
        if (!Search.serverRender || !this.props.fetchData.Json) {
			_self.pullBlogData();
		}
    }

	pullBlogData(page){
		this.props.fetchPosts('http://qqweb.top/API/BlogApi/Query',{PageIndex:page || ++this.props.fetchData.param.PageIndex,key:this.searchValue || ''});
	}

	Query(){
		this.searchValue = this.refs.keyname.value;
		this.pullBlogData(1);
	}

	userChange(e){
		if(this.refs.keyname.value != this.searchValue)this.Query();
	}

	userKeyup(e){
		if(e.keyCode === 13)this.Query();
	}

	render(){
		let fetchData = this.props.fetchData;
		return (
			<div className = "searchbox">
				<div className = "head" >
					<div className = "searchtext" >搜索更懂你！</div>
					<div className="searchinfo">
						<input type = "text" name="keyname" onKeyUp = {this.userKeyup.bind(this)} onChange = {this.userChange.bind(this)} className="keytext" ref = "keyname" />
						<i className = "so" ></i>
						<i className = "del" ></i>
						<div className = "searchbtn" onClick = {this.Query.bind(this)} >搜索</div>
					</div>
				</div>
				<div className = "listbox">
					<ul className = "list" >
					{
						(fetchData.Json && fetchData.Json.BlogWorkList && fetchData.Json.BlogWorkList.length > 0) && 
							fetchData.Json.BlogWorkList.map(item => {
								return 	<li key = {item.ID} className = "item" >
											<Link to={'/detail/' + item.ID} className = "clickarea">
												<div className = "contenthead">
													<div className = "title">{item.Title}</div>
													<div className = "tag">分类:{item.SortName}</div>
												</div>
												<p className = "content">{item.Content}</p>
												<div className = "information">
													<span className = "time">浏览:{item.PageViewTotal}</span>
													<span className = "author">{DateTool.ChangeDateFormat(item.UpdateTime)}</span>
												</div>
											</Link>
										</li>
						})
					}	
					</ul>
					{
						fetchData.imgLoading ?  <Eat/> : <div className = "bottominfo" >--- 我是有底线的 ---</div>
					}
				</div>
			</div>
	    )
	}
} 






