import React, { useEffect, useState } from 'react'
import {
  Steps,
  Button,
  message,
  Form,
  Input,
  Select,
  Divider,
  Alert,
  Result
} from 'antd'
const { Step } = Steps
const Option = Select.Option
const routeView = ({ form }) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
  }
  const style = { maxWidth: '800px', margin: '0 auto' }
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setCurrent(current + 1)
    }, 2000)
  }
  const steps = [
    {
      title: '填写转帐信息',
      content: (
        <Form {...formItemLayout} style={style}>
          <Form.Item label="付款账户">
            {getFieldDecorator('account', {
              initialValue: 'antd-design@alipay.com',
              rules: [
                {
                  required: true,
                  message: `请输入付款账户`
                }
              ]
            })(
              <Select placeholder="请输入付款账户">
                <Option value="antd-design@alipay.com">
                  antd-design@alipay.com
                </Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="付款方式">
            {getFieldDecorator('type', {
              initialValue: 'test@example.com',
              rules: [
                {
                  required: true,
                  message: `请选择付款方式`
                }
              ]
            })(
              <Input
                addonBefore={
                  <Select defaultValue="zhifubao">
                    <Option value="zhifubao">支付宝</Option>
                    <Option value="wechat">微信</Option>
                  </Select>
                }
                style={{ width: '100%' }}
              />
            )}
          </Form.Item>
          <Form.Item label="收款人姓名">
            {getFieldDecorator('targetName', {
              initialValue: '阳炎',
              rules: [
                {
                  required: true,
                  message: `请输入收款人姓名`
                }
              ]
            })(<Input placeholder="请输入收款人姓名" />)}
          </Form.Item>
          <Form.Item label="转账金额">
            {getFieldDecorator('payMoney', {
              initialValue: '5000.00',
              rules: [
                {
                  required: true,
                  message: `请输入转账金额`
                }
              ]
            })(<Input placeholder="请输入转账金额" />)}
          </Form.Item>
          <Divider />
          <div>
            <h3>说明</h3>
            <h4>转账到支付宝账户</h4>
            <p>
              如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
            </p>
            <h4>转账到银行卡</h4>
            <p>
              如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
            </p>
          </div>
        </Form>
      )
    },
    {
      title: '确认转帐信息',
      content: (
        <Form {...formItemLayout} style={style}>
          <Alert
            message="确认转账后，资金将直接打入对方账户，无法退回。"
            type="success"
            style={{ maxWidth: '480px', margin: '0 auto 20px' }}
          />
          <Form.Item label="付款账户">ant-design@alipay.com</Form.Item>
          <Form.Item label="收款账户">test@example.com</Form.Item>
          <Form.Item label="收款人姓名">阳炎</Form.Item>
          <Form.Item label="转账金额">￥ 5,000.00</Form.Item>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <Divider />
          </div>
          <Form.Item label="支付密码">
            {getFieldDecorator('password', {
              initialValue: 22233333,
              rules: [
                {
                  required: true,
                  message: `请输入支付密码`
                }
              ]
            })(<Input type="password" placeholder="请输入支付密码" />)}
          </Form.Item>
        </Form>
      )
    },
    {
      title: '完成',
      content: (
        <Result
          status="success"
          title="已经成功转账到该账户!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              完成
            </Button>,
            <Button style={{ marginLeft: 8 }} onClick={() => setCurrent(0)}>
              再转一笔
            </Button>
          ]}
        />
      )
    }
  ]
  return (
    <div>
      <Steps current={current} style={{ ...style, marginBottom: '40px' }}>
        {steps.map((item, index) => (
          <Step key={item.title} title={item.title} key={index} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action" style={{ textAlign: 'center' }}>
        {current === 0 && (
          <Button
            type="primary"
            onClick={() => {
              setCurrent(current + 1)
            }}
          >
            下一步
          </Button>
        )}
        {current === 1 && (
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            提交
          </Button>
        )}
        {current < 1 && (
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => setCurrent(current - 1)}
          >
            上一步
          </Button>
        )}
      </div>
    </div>
  )
}

export default Form.create()(routeView)
