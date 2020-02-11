import React from "react";
import config from "@s/config/config";
import { Form, Select, Input, Radio } from "antd";
import { get } from "lodash";
const { formItemLayout } = config;
const { Option } = Select;
const getFieldProps = props => {
  const filters = ["title", "formItemProps", "dataIndex"];
  let temp = {};
  Object.keys(props).forEach(key => {
    if (!~filters.indexOf(key)) {
      temp[key] = props[key];
    }
  });
  return temp;
};

/** 根据不同元素类型处理渲染结果 */
const fieldRender = field => {
  const ele_type = get(field, "ele_type");
  const title = get(field, "title");
  if (ele_type === "input") {
    return (
      <Input
        allowClear
        style={{ width: "100%" }}
        placeholder={`请输入${title}`}
        {...getFieldProps(field)}
      />
    );
  } else if (ele_type === "select") {
    return (
      <Select
        showSearch
        placeholder={`请选择${title}`}
        {...getFieldProps(field)}
      >
        {get(field, "options",[]).map((field, index) => (
          <Option key={index} value={field.value + ""}>
            {field.label}
          </Option>
        ))}
      </Select>
    );
  } else if (ele_type === "text") {
    return (
      <Input.TextArea
        rows={4}
        placeholder={`请输入${title}`}
        {...getFieldProps(field)}
      />
    );
  } else if (ele_type === "radio") {
    return (
      <Radio.Group {...getFieldProps(field)}>
        {get(field, "options").map((field, index) => (
          <Radio.Button key={index} value={field.value + ""}>
            {field.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }
};

const VForm = props => {
  const { fields, initialObject = {}, form,ui={} } = props;
  const { getFieldDecorator } = form;
  const layout = get(ui,'layout',formItemLayout)
  /**
   * 渲染formItemhanshu
   * @param {Array} fields 需要渲染的formItem对象
   */
  const formChildren = fields => {
    return fields.map((item, index) => {
      const dataIndex = get(item, "dataIndex", index);
      const title = get(item, "title", "");
      const rules = [];
      if (item.required) {
        rules.push({
          required: true,
          message: `请输入${item.title}`
        });
      }
      return (
        <Form.Item label={title} key={index}>
          {getFieldDecorator(dataIndex, {
            initialValue: initialObject[dataIndex],
            rules
          })(fieldRender(item))}
        </Form.Item>
      );
    });
  };

  return (
    <Form {...layout}>{formChildren(fields)}</Form>
  );
};
export default Form.create()(VForm);
