import { Menu, Icon } from 'antd'
import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Layout } from 'antd'
import router from '@s/router'
import get from 'lodash/get'
const { Sider } = Layout
const SubMenu = Menu.SubMenu


// 分析 : 该组件的数据源有哪些 ? 
// props 
// 问题 : 当我触发路由跳转的时候，没有记录open-keys
// open-keys的数据源 ： 1. onSelect 

// 需要一个外部对象 进行保存openkeys 

// 闭包变量 : 用于保存openkeys
let cache = []


const SiderComponent = ({ history, isCollapsed }) => {
  const hasChildren = item => item.children && item.children.length > 0
  const getTitle = item => (
    <span>
      {item.icon && <Icon type={item.icon} />}
      {item.name}
    </span>
  )

  const generatorMenuTree = (router, prefix) => (router
    .filter(item => !get(item, 'meta.hidden'))
    .map(item =>
      hasChildren(item) ? (
        <SubMenu key={item.path} title={getTitle(item)}>
          {generatorMenuTree(item.children, item.path)}
        </SubMenu>
      ) : (
          <Menu.Item key={prefix ? `${prefix}/${item.path}` : item.path}>
            <Link to={prefix ? `${prefix}/${item.path}` : item.path}>
              {item.icon && <Icon type={item.icon} />}
              {item.name}
            </Link>
          </Menu.Item>
        )
    )
  )

  const onSelect = (node) => {
    const result = /^\/\w+/.exec(node.key);
    if (result && cache.indexOf(result[0]) === -1) {
      cache.push(result[0])
    }
  }

  const onOpenChange = value => {
    cache = value
  }

  // 不使用 ref的情况下
  // 怎么将虚拟DOM的点击事件变成rxjs的Observable 
  // 方法1 : onSelect -> 将数据push cache，等触发下次render的时候对cache 进行订阅，获取到数据后取消订阅 这其实是使用cache的闭包一样。 没什么特别的
  // 方法2 : 将onSelect作为数据源，点击的时候为cache添加数据，render的时候直接渲染cache 但是这种方法行不通



  return (
    <Sider theme="light" collapsed={isCollapsed} collapsedWidth="80">
      <Menu
        defaultOpenKeys={cache}
        selectedKeys={[history.location.pathname]}
        mode="inline"
        theme="light"
        onSelect={onSelect}
        onOpenChange={onOpenChange}
      >
        {generatorMenuTree(router)}
      </Menu>
    </Sider>
  )
}

export default withRouter(SiderComponent)
