//webpack.server.config.js
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const packageFilePath = path.join(__dirname, "../dist")
const isProduct = false

// babel
let babelPluginsArr = [
    "transform-object-rest-spread",
    "transform-decorators-legacy",
    "transform-class-properties",
    "transform-async-to-generator",
    "transform-es2015-modules-commonjs"
];

module.exports = {
    // 告诉 webpack 打包的对象是 node 端的代码，这样一些原生模块webpack 就不会做处理
    target: 'node',  
    node: {
        __filename: true,
        __dirname: true
    },
    //一旦报错就停止打包
    bail: true, 
    entry: {
        index: ['./platforms/server/index.js']
    },
    output: {
        filename: '[name].js',
        path: packageFilePath,
        // vscode断点node端源码
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        //当你的libraryTarget值为commonjs2的时候，你的bundle最终会以module.exports导出整个bundle模块，这种情况大部分是在node环境下运行
        libraryTarget: 'commonjs2'
    },
    //vscode 中调试必备 inline-source-map
    devtool: isProduct ? 'hidden-source-map' : 'inline-source-map',
    module: {
        rules: [{
            test: /\.(es6|jsx|js)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    "presets": [
                        "react"
                    ],
                    "plugins": babelPluginsArr
                }
            }
        }, 
        {
            test: /\.css$/,
            use: {
                loader: 'ignore-loader'
            }
        },
        {
            test: /\.woff|ttf|woff2|eot|otf$/,
            use: {
                loader: 'ignore-loader'
            }
        }, 
        {
            test: /\.less$/,
            use: {
                loader: 'ignore-loader'
            }
        }, 
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: {
                loader: 'ignore-loader'
            }
        }]
    },
    resolve: {
        //别名设置,主要是为了配和webpack.ProvidePlugin设置全局插件;
        alias: {
            //绝对路径;
            action: path.resolve(__dirname, '../src/redux/action'),
            utils: path.resolve(__dirname, '../src/utils')
        }
    },
    plugins: [
        // fix encoding/lib/iconv-loader.js warning
        new webpack.NormalModuleReplacementPlugin(
            /\/iconv-loader$/, 'node-noop'
        )
    ],
    devServer: {
        contentBase: packageFilePath,
        watchContentBase:true,//告诉服务器监视那些通过 devServer.contentBase 选项提供的文件。文件改动将触发整个页面重新加载。默认被禁用。
        compress: true,//一切服务都启用gzip 压缩：
        inline: true,//应用程序启用内联模式,默认内联模式
        hot: true,//启用 webpack 的模块热替换特性
        host:'localhost',//指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定为ip
        stats:{colors: true},// 用颜色标识
        port: 3000,
        historyApiFallback:{
            index:'dist/index.html',
            rewrites: [
              { from: /^\/admin/, to: 'dist/admin.html' }
            ]
        }
    }
}







