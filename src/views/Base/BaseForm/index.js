import React from "react";
import { Form, Input, Select, Radio, Col, Button, Mentions } from "antd";

const { Option } = Select;
const children = [
  {
    label: "鬼畜",
    value: 1
  },
  {
    label: "宅舞",
    value: 2
  },
  {
    label: "番剧",
    value: 3
  },
  {
    label: "美食",
    value: 4
  }
];
const routeView = ({ form, history }) => {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 12
    }
  };

  return (
    <div>
      <Form {...formItemLayout}>
        <Form.Item label="文章标题">
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "请输入你的文章标题"
              }
            ]
          })(<Input allowClear placeholder="起一个恰饭标题吧" />)}
        </Form.Item>
        <Form.Item label="文章分类">
          {getFieldDecorator("sort", {
            rules: [
              {
                required: true,
                message: "请选择分类"
              }
            ]
          })(
            <Select showSearch placeholder="选个分类呗">
              {children.map(item => (
                <Option key={item.value} value={item.value + ""}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="文章简介">
          {getFieldDecorator(
            "shortInfo",
            {}
          )(<Input allowClear placeholder="给个简介" />)}
        </Form.Item>
        <Form.Item label="文章内容">
          {getFieldDecorator("shortInfo", {
            rules: [
              {
                required: true,
                message: "请选择分类"
              }
            ]
          })(<Input.TextArea rows={5} placeholder="文章内容不可描述..." />)}
        </Form.Item>
        <Form.Item label="发布类型">
          {getFieldDecorator("type", {
            initialValue: "a",
            rules: [
              {
                required: true,
                message: "请选择发布类型"
              }
            ]
          })(
            <Radio.Group>
              <Radio.Button value="a">公开</Radio.Button>
              <Radio.Button value="b">私密</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="邀请">
          {getFieldDecorator("friends", {
            initialValue: "@COPY"
          })(
            <Mentions style={{ width: "100%" }}>
              <Option value="COPY">COPY</Option>
              <Option value="孙笑川">孙笑川</Option>
              <Option value="JACKMA">JACKMA</Option>
            </Mentions>
          )}
        </Form.Item>
        <Col span={6}></Col>
        <Col>
          <p>你的文章将会发布或在云端显示</p>
        </Col>
        <div style={{ width: "300px", margin: "0 auto", textAlign: "center" }}>
          <Button type="primary" style={{ marginRight: "10px" }}>
            提交
          </Button>
          <Button>保存</Button>
        </div>
      </Form>
    </div>
  );
};

export default Form.create()(routeView);
