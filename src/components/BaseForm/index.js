import React, { useState } from 'react'
import {
  Form,
  Select,
  Input,
  Radio,
  DatePicker,
  Row,
  Col,
  Card,
  Cascader,
  Tooltip
} from 'antd'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
// 以下为表单元素类型 驼峰命名后面部分全部截掉 datePicker -> date
import huaji from './huaji.svg'
const INPUT = 'input'
const SELECT = 'select'
const TEXTAREA = 'text'
const RADIO = 'radio'
const DATEPICKER = 'date'
const CASCADER = 'cascader'

// 以下为picker类型
const MONTH = 'month'
const RANGE = 'range'
const WEEK = 'week'

// 表单默认布局
const DEFAULTLAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const invariant = (label, ...args) => {
  if (process.env.NODE_ENV === 'development') {
    const messages = args.map(msg => ' ' + msg)
    throw new Error(`${label} error : ${messages.join('')}`)
  }
}

/** (用于picker) 根据title名称 如date.month 选择不同的picker */
const pickersGenerator = field => {
  // 提取 后缀
  const subfix = field.ele_type.replace(/^.*\./, '')
  switch (subfix) {
    case MONTH: {
      return (
        <DatePicker.MonthPicker
          {...field.props}
          placeholder={`请选择${field.title}日期`}
        />
      )
    }
    case RANGE: {
      return (
        <DatePicker.RangePicker
          {...field.props}
          placeholder={`请选择${field.title}日期`}
        />
      )
    }
    case WEEK: {
      return (
        <DatePicker.WeekPicker
          {...field.props}
          placeholder={`请选择${field.title}日期`}
        />
      )
    }
    default: {
      return (
        <DatePicker {...field.props} placeholder={`请选择${field.title}日期`} />
      )
    }
  }
}

/** 根据传入options 生成select options */
const optionsGenerator = type => options => {
  switch (type) {
    case SELECT: {
      return options.map((item, index) => (
        <Select.Option key={index} value={item.value + ''}>
          {item.label}
        </Select.Option>
      ))
    }
    case RADIO: {
      return options.map((item, index) => (
        <Radio.Button key={index} value={item.value + ''}>
          {item.label}
        </Radio.Button>
      ))
    }
  }
}

/** 根据fields的项 返回对应的React Node节点 */
const fieldNodeGenerator = field => {
  const title = field.title
  const type = field.ele_type.replace(/\..*/, '')
  switch (type) {
    case INPUT: {
      return (
        <Input
          {...field.props}
          allowClear
          placeholder={`请输入${title}`}
        ></Input>
      )
    }
    case SELECT: {
      return (
        <Select
          {...field.props}
          allowClear
          showSearch
          placeholder={`请选择${title}`}
        >
          {optionsGenerator(SELECT)(get(field, 'options', []))}
        </Select>
      )
    }
    case TEXTAREA: {
      return (
        <Input.TextArea
          allowClear
          rows={4}
          {...field.props}
          placeholder={`请输入${title}`}
        />
      )
    }
    case RADIO: {
      return (
        <Radio.Group {...field.props}>
          {optionsGenerator(RADIO)(get(field, 'options', []))}
        </Radio.Group>
      )
    }
    case DATEPICKER: {
      return pickersGenerator(field)
    }
    case CASCADER: {
      return (
        <Cascader
          placeholder={`请选择${title}`}
          options={field.options}
          {...field.props}
        />
      )
    }
    default: {
      invariant(
        'BaseForm',
        `please check your field ele_type as${JSON.stringify(field)}`
      )
    }
  }
}

/** 表单元素生成 */
const formItemGenerator = (
  { fields, rulesMap, colNum, initValue, hasHide, maxNum },
  { getFieldDecorator }
) =>
  fields.map((field, index) => {
    const key = get(field, 'key'),
      title = get(field, 'title')
    // 检查title属性是否存在
    if (title === undefined) {
      invariant(
        'BaseForm',
        `field title must be required!${JSON.stringify(field)}`
      )
    }
    // 检查key 属性是否存在
    if (key === undefined) {
      invariant(
        'BaseForm',
        `field key must be required!${JSON.stringify(field)}`
      )
    }
    // 其实还可以继续检查是否有重复key... 此处省略

    // 对应的表单元素校验数组
    let rules
    if (typeof rulesMap[key] === 'boolean' && rulesMap[key]) {
      // 必填
      rules = [{ required: true, message: `${field.title}不能为空` }]
    }
    if (Array.isArray(rulesMap)) {
      rules = rulesMap
    }
    // 生成className
    let style
    if (maxNum && index > maxNum) {
      style = hasHide ? { display: 'none' } : undefined
    }
    return (
      <Col span={colNum} key={key} style={style}>
        <Form.Item label={title}>
          {getFieldDecorator(key, {
            initialValue: get(initValue, key),
            rules
          })(fieldNodeGenerator(field))}
        </Form.Item>
      </Col>
    )
  })

const EllipsisBtn = ({ colNum, onShowHideClick, hasHide }) => (
  <Col style={{ textAlign: 'center' }} span={colNum}>
    <a onClick={onShowHideClick} style={{ cursor: 'pointer' }}>
      {hasHide ? (
        <Tooltip title="点我展开表单" key="tooltip-show">
          ...
        </Tooltip>
      ) : (
        <Tooltip title="点我隐藏表单" key="tooltip-hide">
          <img src={huaji} width="50" height="50" />
        </Tooltip>
      )}
    </a>
  </Col>
)

const BaseForm = props => {
  // 表单元素数组
  const fields = get(props, 'fields', [])
  // 校验规则
  const rulesMap = get(props, 'rules', [])
  // 表单一行占位个数
  const colNum = parseInt(24 / get(props, 'setting.colNum', 3))
  // 表单控件占位
  const layout = get(props, 'setting.layout', DEFAULTLAYOUT)
  // 是否显示超过n个的隐藏控件
  const maxNum = get(props, 'setting.maxNum')
  // 表单默认值
  const initValue = cloneDeep(get(props, 'initValue', {}))
  // 以下是antd 提供api
  const form = get(props, 'form')
  const validateFields = get(props, 'form.validateFields')

  // 对propsapi注入方法
  const api = get(props, 'api')
  if (api) {
    api.getResult = () => {
      let result
      validateFields((err, values) => {
        if (!err) {
          // 深拷贝一份 保证函数无副作用
          result = cloneDeep(values)
        }
      })
      return result
    }
  }
  let hasHide, setHasHide, onShowHideClick
  if (maxNum && typeof maxNum === 'number') {
    const state = useState(true)
    hasHide = state[0]
    setHasHide = state[1]
    onShowHideClick = () => {
      setHasHide(!hasHide)
    }
  }

  return (
    <Form {...layout}>
      <Row>
        {formItemGenerator(
          { fields, rulesMap, colNum, initValue, hasHide, maxNum },
          form
        )}
        {maxNum && <EllipsisBtn {...{ colNum, onShowHideClick, hasHide }} />}
        <Col span={colNum} style={{ float: 'right' }}>
          {props.children}
        </Col>
      </Row>
    </Form>
  )
}

const CardHoc = Component => props => (
  <Card>
    <Component {...props} />
  </Card>
)

export default Form.create()(BaseForm)

export const BaseFormPlus = Form.create()(CardHoc(BaseForm))
