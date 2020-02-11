import React from 'react'
import './index.less'
import { Breadcrumb } from 'antd'
import { withRouter } from 'react-router-dom'

const Breadcrumbs = props => {
  // 一级路由
  const firstRoute = props
  // 二级路由
  const secondRoute = props.children.find(item =>
    props.location.pathname.includes(item.path)
  )
  return (
    <div className="bread-crumbs">
      <Breadcrumb>
        <Breadcrumb.Item>{firstRoute.name}</Breadcrumb.Item>
        {secondRoute && (
          <Breadcrumb.Item>
            <a>{secondRoute.name}</a>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  )
}

export default withRouter(Breadcrumbs)
