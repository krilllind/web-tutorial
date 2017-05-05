"use strict";

var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = (function () {
    var config = {};

    config.devtool = 'inline-source-map';

    config.resolve = {
        extensions: [".js"]
    };

    config.entry = {
        'boot': './main.js',
        'index': './wwwroot/index.html'
    };

    config.output = {
        filename: '[name].js',
        publicPath: '/dist/',
        path: path.join(__dirname, './wwwroot/dist/')
    };

    config.devServer = {
        contentBase: "./wwwroot/",
        host: "127.0.0.1",
        port: 3000,
        historyApiFallback: true
    };

    config.module = {
        rules: [
            { test: /\.html$/, use: ['raw-loader'] },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.(png|jpg|jpeg|gif)$/, use: ['file-loader', 'url-loader?limit=100000'] },
            {
                test: /(\.scss$)|(\.css$)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/dist/'
                })
            }
        ]
    };

    config.plugins = [

        new ExtractTextPlugin({
            filename: "style.css",
            disable: false,
            allChunks: true
        }),

        new webpack.NamedModulesPlugin()
    ];

    return config;
})();