//webpack.server.config.js
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const isProduct = false;

// babel
let babelPluginsArr = [
    "transform-object-rest-spread",
    "transform-decorators-legacy",
    "transform-class-properties",
    "transform-async-to-generator",
    "transform-es2015-modules-commonjs"
];

module.exports = {
    target: 'node',  // 构建输出node可以识别的内容
    node: {
        __filename: true,
        __dirname: true
    },
    bail: true, //一旦报错就停止打包
    entry: {
        //m:['./src/m.js']
        //,main:['./src/main.js']
        index: ['./platforms/server/index.js']
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, "../dist"),
        // vscode断点node端源码
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        libraryTarget: 'commonjs2'
    },
    devtool: isProduct ? 'hidden-source-map' : 'inline-source-map',//vscode 中调试必备 inline-source-map
    resolve: {
        //别名设置,主要是为了配和webpack.ProvidePlugin设置全局插件;
        alias: {
            //绝对路径;
            action: path.resolve(__dirname, '../src/redux/action'),
            utils: path.resolve(__dirname, '../src/utils')
        }
    },
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
        }, {
            test: /\.css$/,
            use: {
                loader: 'ignore-loader'
            }
        }, {
            test: /\.woff|ttf|woff2|eot|otf$/,
            use: {
                loader: 'ignore-loader'
            }
        }, {
            test: /\.less$/,
            use: {
                loader: 'ignore-loader'
            }
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: {
                loader: 'ignore-loader'
            }
        }]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     IS_BROWSER: false,
        //     'process.env': {
        //         'NODE_ENV': isPpeOrProduct ? JSON.stringify('production') : JSON.stringify(env)
        //     }
        // })
    ]
};








