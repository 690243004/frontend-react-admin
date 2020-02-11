import React, { useState } from 'react'
import { Menu, Button, List, Divider } from 'antd'
import './index.scss'
import VForm from '@c/VForm'
const routeView = props => {
  const formprops = {
    fields: [
      {
        title: '昵称',
        dataIndex: 'nickname',
        ele_type: 'input'
      },
      {
        title: 'bio',
        dataIndex: 'bio',
        ele_type: 'text'
      },
      {
        title: '电子邮件',
        dataIndex: 'emial',
        ele_type: 'input'
      },
      {
        title: '加密方式',
        dataIndex: 'nickname',
        ele_type: 'input'
      },
      {
        title: '链接密码',
        dataIndex: 'linkpws',
        ele_type: 'input'
      },
      {
        title: '登录密码',
        dataIndex: 'loginpws',
        ele_type: 'input'
      }
    ],
    ui: {
      layout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      }
    }
  }
  const [selectedKey, setSelectedKey] = useState(['1'])
  const content = () => {
    switch (selectedKey[0]) {
      case '1':
        return (
          <div className="setting-content">
            <h1>基本设置</h1>
            <VForm {...formprops} />
            <div>
              <Button type="primary">提交</Button>
              <Button type="default" style={{ marginLeft: '10px' }}>
                保存
              </Button>
            </div>
          </div>
        )
      case '2':
        return (
          <List>
            <List.Item actions={[<a key="list-loadmore-edit">修改</a>]}>
              <List.Item.Meta
                title="账户密码"
                description="当前密码强度 : 强"
              />
            </List.Item>
            <List.Item actions={[<a key="list-loadmore-edit">修改</a>]}>
              <List.Item.Meta
                title="密保手机"
                description="已绑定手机 : 138****8293"
              />
            </List.Item>
            <List.Item actions={[<a key="list-loadmore-edit">修改</a>]}>
              <List.Item.Meta
                title="密保问题"
                description="未设置密保问题，密保问题可有效保护账户安全"
              />
            </List.Item>
            <List.Item actions={[<a key="list-loadmore-edit">修改</a>]}>
              <List.Item.Meta
                title="备用邮箱"
                description="已绑定邮箱 : ant***sign.com"
              />
            </List.Item>
            <List.Item actions={[<a key="list-loadmore-edit">修改</a>]}>
              <List.Item.Meta
                title="MFA 设备"
                description="未绑定 MFA 设备，绑定后，可以进行二次确认"
              />
            </List.Item>
          </List>
        )
      default:
        return <div>Hahah </div>
    }
  }
  const handleClick = ({ key }) => {
    setSelectedKey([key + ''])
  }
  return (
    <div className="user-setting">
      <Menu
        onClick={handleClick}
        className="menu-class"
        selectedKeys={selectedKey}
      >
        <Menu.Item key="1">基本设置</Menu.Item>
        <Menu.Item key="2">安全设置</Menu.Item>
        <Menu.Item key="3">个性化</Menu.Item>
        <Menu.Item key="4">账户绑定</Menu.Item>
        <Menu.Item key="5">新消息提醒</Menu.Item>
      </Menu>
      <div className="setting-content">{content()}</div>
    </div>
  )
}
export default routeView
