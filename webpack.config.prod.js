/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ObjectRestSpreadPlugin = require("@sucrase/webpack-object-rest-spread-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: ["babel-polyfill", "./src/index.jsx"],
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    babelrc: false,
                    presets: ["react", "env"],
                    plugins: [
                        "syntax-dynamic-import",
                        "transform-class-properties",
                        "transform-object-rest-spread",
                    ],
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    output: {
        filename: "bundle-[name].js",
        path: path.resolve(__dirname, "public", "scripts"),
        publicPath: "scripts/",
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true,
        hot: true,
        compress: true,
        port: 6001,
        disableHostCheck: true,
    },
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new ObjectRestSpreadPlugin(),
        new UglifyJSPlugin({
            uglifyOptions: {
                beautify: false,
                ecma: 6,
                compress: true,
                comments: false,
                mangle: {
                    safari10: true,
                    keep_fnames: true,
                },
            },
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new Dotenv({
            path: "./.env",
            safe: true
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
    ],
};