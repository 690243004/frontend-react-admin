import React from "react";
import config from "@s/config/config";
import { Form,Input } from 'antd'
const { formItemLayout } = config;

const getInputProps = props => {
  const filters = ["title", "value", "formItemProps","hide"];
  let temp = {};
  Object.keys(props).forEach(key => {
    if (!~filters.indexOf(key)) {
      temp[key] = props[key];
    }
  });
  return temp;
};

const getVarible = props => {
  const { title } = props;
  let temp = {};
  const arr = title.split(" ");
  temp.label = arr[0];
  temp.title = arr[1];
  temp.placeholder = `请输入${arr[0]}`;
  if (arr[2]) {
    temp.rules = [
      {
        required: true,
        message: `请输入${arr[0]}`
      }
    ];
  }
  // label存在时才使用layout
  if(arr[0]) { 
    temp.formItemLayout = formItemLayout
  }
  return temp;
};

export default props => {
  const { form,value,hide } = props;
  const { getFieldDecorator } = form;
  const { label = "", title = "", rules, placeholder = "",formItemLayout } = getVarible(props);
  return (
    <Form.Item label={!!hide?'':label} {...formItemLayout}>
      {getFieldDecorator(title, {
        initialValue: value,
        rules
      })(<Input style={{width:"100%"}} placeholder={placeholder} {...getInputProps(props)} />)}
    </Form.Item>
  );
};
