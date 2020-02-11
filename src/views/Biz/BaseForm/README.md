# 组件简介
名称 : 基础表单组件(BaseForm)

该组件是封装Antd表单组件，目标是通过JSON配置而使开发者免于书写大量的重复、无用的JSX。

## BaseForm Props 
prop属性 | 类型 | 默认值 | 说明 
- | - | - | - 
fields | field[] | [] | 表单项
rules | object | {} | 表单项对应的规则 当为true时，表示该表单项必填
setting | object | null | 表单设置对象
api | object | null | 如果传入了该props，则子组件暴露一些快捷的api给他，如`getResult()`
initValue | object | {} | 表单默认值对象

## setting 
属性名 | 类型 | 默认值 | 说明 
- | - | - | - 
colNum | Number | 3 | 表单元素一行占多少个，默认3个
maxNum | Number | null | 如果设置了该项，则表单在超过n个控件时会隐藏剩余表单控件 注意 : 使用这个属性，意味着组件中会通过hook创建一个状态(不建议使用)
layout | object | `{ labelCol: { span: 6 },wrapperCol: { span: 16 } }` | 表单控件占位


## field Interface 

属性名 | 类型 | 默认值 | 说明 
- | - | - | - 
title | string | null | 必填属性，表单控件label标签名
key | string | null | 必填属性，表单控件字段名
ele_type | string | null | 必填，表单控件类型
props | object | null | 该属性将传入antd控件中
colNum | Number | null | 表单元素一行占的位置，如果填入该属性，渲染方法将会优先渲染该属性

现在支持的ele_type 有 : 
` input,select,text,radio,date,date.month,date.range,date.week `

## props.children 
此外，BaseFrom还接受props.children，并在表单下渲染

