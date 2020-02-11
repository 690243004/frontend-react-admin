import React from 'react'
import {
  List,
  Descriptions,
  Card,
  Icon,
  Row,
  Col,
  Skeleton,
  Avatar
} from 'antd'
import ReactEcharts from 'echarts-for-react'
import { echartsData1, echartsData2 } from './mock'
import icon from '@s/assets/images/avatar.png'
const { Meta } = Card

export default () => {
  const colProps = {
    span: 6
  }
  const desProps = {
    column: 2
  }
  const list = [{}, {}, {}]
  return (
    <div>
      <p className="font-size-large">HELLO YANGYAN!</p>
      <p className="font-size-small">Welcome to your Dashboard</p>

      <Row gutter={20}>
        <Col {...colProps}>
          <Card>
            <Meta
              avatar={
                <Icon
                  style={{ fontSize: '20px', color: '#b077f4' }}
                  type="cloud"
                  theme="filled"
                />
              }
              title="访客数量为"
              description="4396"
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card>
            <Meta
              avatar={
                <Icon
                  style={{ fontSize: '20px', color: '#5dd0c8' }}
                  type="highlight"
                  theme="filled"
                />
              }
              title="文章数量"
              description="6443"
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card>
            <Meta
              avatar={
                <Icon
                  style={{ fontSize: '20px', color: '#55a9fd' }}
                  type="cloud"
                  theme="filled"
                />
              }
              title="最新更新"
              description="2018-11-16:11:24:30"
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card>
            <Meta
              avatar={
                <Icon
                  style={{ fontSize: '20px', color: '#fb6195' }}
                  type="yuque"
                  theme="filled"
                />
              }
              title="总收入"
              description="8989898"
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }} gutter={20}>
        <Col span={12}>
          <ReactEcharts option={echartsData1} />
        </Col>
        <Col span={12}>
          <Descriptions title="Rank Info" {...desProps}>
            <Descriptions.Item label="The first visit">
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item label="Collection">1810000000</Descriptions.Item>
            <Descriptions.Item label="Sort Rank">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Process">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Row style={{ marginTop: '20px' }} gutter={20}>
        <Col span={12}>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    avatar={<Avatar src={icon} />}
                    title={<a href="https://ant.design">nameless</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <ReactEcharts option={echartsData2} />
        </Col>
      </Row>
    </div>
  )
}
