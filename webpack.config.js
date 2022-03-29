/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ObjectRestSpreadPlugin = require('@sucrase/webpack-object-rest-spread-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: ["babel-polyfill", "./src/index.jsx"],
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    babelrc: false,
                    presets: ["react", "env"],
                    plugins: ["syntax-dynamic-import", "transform-class-properties", "transform-object-rest-spread"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        filename: "bundle-[name].js",
        path: path.resolve(__dirname, "public", "scripts"),
        publicPath: "scripts/"
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true,
        compress: true,
        port: 6001,
        disableHostCheck: true
    },
    plugins: [
        new ObjectRestSpreadPlugin(),
        new HtmlWebpackPlugin({
            template: "public/index.html"
        })
    ]
};