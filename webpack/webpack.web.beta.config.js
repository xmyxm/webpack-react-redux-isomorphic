"use strict"
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const configPath = require('../config/config.js')
let config = require('./webpack.web.base.config.js')


config.output.publicPath = `http://${host}:${port}/`
config.plugins = config.plugins||[];
config.plugins.push(
	//css 文件抽离设置 如为dev 环境 disable必须为 true 才会把 css 打为内联样式来实现热刷新，若线上环境必须disable必须为false才会单独抽离出css文件
	new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true })
);
config.plugins.push(
	//允许你创建一个在编译时可以配置的全局常量，只能在被打包的文件中读取到这个全局变量
	new webpack.DefinePlugin({
	    'process.env': {
	        NODE_ENV: '"development"'
	    },
	    BUILD_ENV: JSON.stringify("web")
	})
);

config.devServer = {
		headers: {
            'Access-Control-Allow-Origin': '*'
        },
        // 本地node-server的host，如需调整自行修改
        //public: 'local.51ping.com:8080',
		contentBase: path.join(__dirname, "../dist"),
		watchContentBase:true,//告诉服务器监视那些通过 devServer.contentBase 选项提供的文件。文件改动将触发整个页面重新加载。默认被禁用。
		compress: true,//一切服务都启用gzip 压缩：
		inline: true,//应用程序启用内联模式,默认内联模式
		hot: true,//启用 webpack 的模块热替换特性
		host: host,//指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定为ip
		stats:{colors: true},// 用颜色标识
		port: port,
		historyApiFallback:{
			index:'dist/index.html',
			rewrites: [
			  { from: /^\/admin/, to: 'dist/admin.html' }
			]
	    }
	}
//source-map的打包可以告诉我们错误源自源码的具体的位置,devtool来选定生成的source-map的详细程度
config.devtool = 'eval-source-map'; //推荐development
config.devtool = 'cheap-module-eval-source-map';
module.exports = config;


















