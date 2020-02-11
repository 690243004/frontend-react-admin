import React from 'react'
import ListPage from '@c/ListPage'
import { Divider, Card, Button, Input, Row, Col } from 'antd'
import reactIcon from '@s/assets/images/react.jpg'
import vueIcon from '@s/assets/images/vue.png'
import webglIcon from '@s/assets/images/webgl.png'
import get from 'lodash/get'
import './index.css'
const ButtonGroup = Button.Group
const { Search } = Input

const routeView = props => {
  const firCol = [
    {
      title: 'React是一个为数据提供渲染为HTML视图的开源JavaScript 库。',
      img: reactIcon
    },
    {
      title: 'Vue是一个渐进式渲染框架',
      img: vueIcon
    },
    {
      title:
        'WebGL是一种avaScript API，用于在任何网页浏览器中呈现交互式2D和3D图形',
      img: webglIcon
    }
  ]
  const listProps = {
    columns: [
      {
        field: '序号 index',
        render: (value, row, index) => {
          return (
            <div className="first-column">
              <img src={get(firCol, `${index}.img`)}></img>
              <span style={{ lineHeight: '48px' }}>
                {get(firCol, `${index}.title`)}
              </span>
            </div>
          )
        }
      }
    ],
    api: {
      promise: async () => ({
        code: 0,
        data: {
          list: new Array(3).fill({}),
          total: 3
        }
      })
    },
    ui: {
      showHeader: false
    }
  }

  return (
    <div>
      <div className="task-list">
        <div className="task-list-item">
          <p>我的代办</p>
          <h1>8个任务</h1>
        </div>
        <div className="task-list-item">
          <p>我的代办</p>
          <h1>8个任务</h1>
        </div>
        <div className="task-list-item">
          <p>我的代办</p>
          <h1>8个任务</h1>
        </div>
      </div>
      <Card
        title="标准列表"
        bordered={false}
        bodyStyle={{ padding: 0, height: '1px' }}
        extra={
          <Row type="flex" gutter={20}>
            <Col>
              <ButtonGroup>
                <Button type="primary">全部</Button>
                <Button type="primary">进行中</Button>
                <Button type="primary">等待中</Button>
              </ButtonGroup>
            </Col>
            <Col>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                enterButton
              />
            </Col>
          </Row>
        }
      ></Card>
      <Button type="dashed" block style={{ margin: '10px' }}>
        添加
      </Button>
      <ListPage {...listProps} />
    </div>
  )
}
export default routeView
