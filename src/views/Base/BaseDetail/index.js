import React from 'react'
import { Row, Col, Divider } from 'antd'
import './index.css'
import ListPage from '@c/ListPage'
const routeView = props => {
  const listProps = {
    columns: [
      {
        field: '商品编号 orderID',
        render: () => '1234561'
      },
      {
        field: '商品名称 orderName',
        render: () => '菊花茶250ml'
      },
      {
        field: '商品条码 barCode',
        render: () => '12421432143214321'
      },
      {
        field: '单价 price',
        render: () => '2.00	'
      },
      {
        field: '数量（件） num',
        render: () => '1'
      },
      {
        field: '金额 total',
        render: () => '2.00'
      }
    ],
    api: {
      promise: function() {
        return new Promise(res => {
          res({
            data: {
              list: [{}, {}, {}],
              total: 3
            },
            code: 0
          })
        })
      }
    }
  }
  const listProps2 = {
    columns: [
      {
        field: '时间 orderID',
        render: () => '2017-10-01 14:10'
      },
      {
        field: '当前进度 orderName',
        render: () => '联系客户'
      },
      {
        field: '状态 barCode',
        render: () => (
          <div>
            <span
              style={{
                display: 'inline-block',
                borderWidth: '4px',
                marginRight: '3px',
                marginBottom: '1px',
                borderRadius: '50%',
                borderStyle: 'solid',
                borderColor: '#52c41a'
              }}
            ></span>
            <span>进行中</span>
          </div>
        )
      },
      {
        field: '操作员ID price',
        render: () => '2.00	'
      },
      {
        field: '耗时 num',
        render: () => '1'
      }
    ],
    api: {
      promise: function() {
        return new Promise(res => {
          res({
            data: {
              list: [{}, {}, {}],
              total: 3
            },
            code: 0
          })
        })
      }
    }
  }
  return (
    <div className="baseDetail">
      <Row>
        <p className="baseDetail-title">退款申请</p>
        <Col className="colClass" span={8}>
          <span>取货单号</span>
          <span>1000000000</span>
        </Col>
        <Col className="colClass" span={8}>
          <span>状态</span>
          <span>已取货</span>
        </Col>
        <Col className="colClass" span={8}>
          <span>销售单号</span>
          <span>1234123421</span>
        </Col>
        <Col className="colClass" span={8}>
          <span>子订单</span>
          <span>3214321432</span>
        </Col>
      </Row>
      <Divider />
      <Row>
        <p className="baseDetail-title">用户信息</p>
        <Col className="colClass" span={8}>
          <span>用户姓名</span>
          <span>付小小</span>
        </Col>
        <Col className="colClass" span={8}>
          <span>联系电话</span>
          <span>18100000000</span>
        </Col>
        <Col className="colClass" span={8}>
          <span>常用快递</span>
          <span>菜鸟仓储</span>
        </Col>
        <Col className="colClass" span={8}>
          <span>取货地址</span>
          <span>浙江省杭州市西湖区万塘路18号</span>
        </Col>
        <Col className="colClass" span={8}>
          <span>备注</span>
          <span>无</span>
        </Col>
      </Row>
      <Divider />
      <Row>
        <p className="baseDetail-title">退货商品</p>
        <ListPage {...listProps}></ListPage>
      </Row>
      <Divider />
      <Row>
        <p className="baseDetail-title">退货进度</p>
        <ListPage {...listProps2}></ListPage>
      </Row>
    </div>
  )
}
export default routeView
