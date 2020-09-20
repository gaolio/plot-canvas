const path = require("path");
const WebpackBar = require('webpackbar');
const CompressionPlugin = require("compression-webpack-plugin")
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const loaders = require("./loader/loader");
const resolve = url => path.resolve(__dirname, url);

module.exports = {
    entry: {
        main: resolve('../src/main')
    },
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    output: {
         // 修改打包出口，在最外级目录打包出一个 index.js 文件，我们 import 默认会指向这个文件
        filename: "[name].js",
        library: "[name]", 
        libraryTarget: 'umd',
        umdNamedDefine: true  
    },
    // reslove 路径别名
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': resolve('../src'),
        }
    },
    module: loaders,
    // webpack - dev-server 热更新
    devServer:{
        compress: true,
        hot: true,
        open: true,
        port: 8090
    },
    // plugin 插件
    plugins:[
         // 全局处理vue插件
        // new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            title: "Plot",
            baseUrl: resolve('../public'),
            template: resolve('../public/index.html'),
            inject: true,
        }),
        new WebpackBar(),
        // 清空目录
        // new CleanWebpackPlugin(),
        new CompressionPlugin({
            // 打包
            test: /\.(js|css|svg|woff|ttf|json|html|eot)$/
        })

    ]
}










































































