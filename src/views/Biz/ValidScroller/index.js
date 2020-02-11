import React, { useEffect } from 'react'
import './index.less'
import request from '@u/request'
import SliderCheck from './SliderCheck'

export class RouteView extends React.Component {
  async componentDidMount () {
    const options = {
      dataUrl: 'https://www.zdxhyangyan.cn/offset/api/getValid', // 图片地址 默认get方法
      submitUrl: 'https://www.zdxhyangyan.cn/offset/api/checkX', // 提交地址
      onSuccess: function () {
        // 成功回调
      },
      onFail: function () {
        // 失败回调
      },
      onRefresh: function () {
        // 刷新回调
      }
    }
    SliderCheck(options, document.getElementById('el2'))
  }
  render () {
    return (
      <div>
        <div className="el" id="el"></div>
        <div className="el" id="el2"></div>
      </div>
    )
  }
}
export default RouteView
