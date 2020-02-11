const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const WorkboxPlugin = require('workbox-webpack-plugin') // 引入 PWA 插件
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = merge(common, {
  mode: 'production',
  entry: path.join(__dirname, './src/index.js'),
  // 配置模块,主要用来配置不同文件的加载器
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': '#39C5BB',
                'link-color': '#FFC0CB',
                'border-radius-base': '2px'
              },
              javascriptEnabled: true
            }
          }
        ])
      },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: ['url-loader?limit=17631&name=[hash:8]-[name].[ext]']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader' }
    ]
  },

  // 配置插件
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      //指定模板对象 将来根据指定的页面路径 去生成内存中的页面
      filename: 'index.html'
      // favicon: './favicon.ico'
    }),
    // 配置 PWA
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    // 忽略除了zh_cn外的moment文件
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin('styles.css')
    //new BundleAnalyzerPlugin(),
    // 清理dist下文件
  ],
  optimization: {
    splitChunks: {
      chunks: 'all' //  分离所有引入的库
    }
  }
})
