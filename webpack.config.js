var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry : [
    "./app/index.js"
  ],
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js",
    chunkFilename: "chunk_dist.js"
  },
  module : {
    loaders: [
      {test: /\.js$/, include: __dirname + '/app', loader: "babel-loader"},
      { test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,  loader: 'url-loader?limit=100000' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin("style.css", {
      allChunks: true
  })]
}
