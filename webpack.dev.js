const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: path.join(__dirname, "./src/index.dev.js"),
  //__dirname动态获取当前文件模块所属目录的绝对路径
  //__filename可以获取当前文件的绝对路径
  mode: "development",
  devtool: "eval-source-map",
  // 配置模块,主要用来配置不同文件的加载器
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              /*             modifyVars: {
                'primary-color': '#39C5BB',
                'link-color': '#FFC0CB',
                'border-radius-base': '2px'
              }, */
              javascriptEnabled: true
            }
          }
        ]
      },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: ["url-loader?limit=17631&name=[hash:8]-[name].[ext]"]
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.js|jsx$/, use: ["babel-loader"], exclude: /node_modules/ },
      { test: /\.(ttf|eot|svg|woff|woff2|otf)$/, use: "url-loader" }
    ]
  },

  // 配置插件
  plugins: [
    //配置热更新模块对象
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
      //指定模板对象 将来根据指定的页面路径 去生成内存中的页面
      filename: "index.html"
    })
  ],
  devServer: {
    hot: true, // 启用热模块更新
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true,
        pathRewrite: {
          "/api": ""
        }
      }
    }
  }
});
