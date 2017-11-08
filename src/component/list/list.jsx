import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from './list_action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTool from 'utils/date-format.js';
import Eat from '../animation/eat.jsx';
import './list.less';

@connect(state => { return { fetchData: state.ListData } }, { fetchPosts })
export default class List extends Component {
	constructor(props) {
		super(props);
	}

	static serverRender(store) {
		return fetchPosts('http://qqweb.top/API/BlogApi/WorkList', { PageIndex: 1, PageSize: 10 })(store.dispatch);
	}

	componentWillUnmount() {
		window.onscroll = null;
	}

	componentDidMount() {
		let _self = this;
		window.onscroll = (e) => {
			if (!_self.props.fetchData.imgLoading || _self.props.fetchData.isFetching) return;
			let alltop = (document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight + 150;
			if (alltop > document.body.scrollHeight) {
				_self.pullBlogData();
			}
		}
		if (!List.serverRender || !this.props.fetchData.Json) {
			_self.pullBlogData();
		}
	}

	pullBlogData() {
		this.props.fetchPosts('http://qqweb.top/API/BlogApi/WorkList', { PageIndex: ++this.props.fetchData.param.PageIndex, PageSize: 10 });
	}

	render() {
		let fetchData = this.props.fetchData;
		return (
			<div className="listbox">
				<ul className="list" >
					{
						(fetchData.Json && fetchData.Json.BlogWorkList && fetchData.Json.BlogWorkList.length > 0) &&
						fetchData.Json.BlogWorkList.map(item => {
							return <li key={item.ID} className="item" >
								<Link to={'/detail/' + item.ID} className="clickarea">
									<div className="contenthead">
										<div className="title">{decodeURIComponent(item.Title)}</div>
										<div className="tag">分类:{item.SortName}</div>
									</div>
									<p className="content">{decodeURIComponent(item.Content)}</p>
									<div className="information">
										<span className="time">浏览:{item.PageViewTotal}</span>
										<span className="author">{DateTool.ChangeDateFormat(item.UpdateTime)}</span>
									</div>
								</Link>
							</li>
						})
					}
				</ul>
				{
					fetchData.imgLoading ? <Eat /> : <div className="bottominfo" >--- 我是有底线的 ---</div>
				}
			</div>
		)
	}
}






























