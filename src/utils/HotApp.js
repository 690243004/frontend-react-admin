// 用于开发环境使用热更新高阶组件
// 由于高阶组件不能在ReactDOM.render的文件下使用(这点待考究)
// 也不能在App.js中导入react-hot-loader(会污染开发环境) 所以迁移至此
import { hot } from "react-hot-loader/root";
import { App } from "../App";
import React from "react";
export default hot(App);
