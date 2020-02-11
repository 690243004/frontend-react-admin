# 示例 

## jsx 
```jsx
<BaseForm ref={dom => (ref = dom)} {...baseFormProps}>
  <div style={{ textAlign: 'right' }}>
    <Button type="primary" onClick={onSubmitHandler}>
      提交表单
    </Button>
  </div>
</BaseForm>
```
## props
```js
const baseFormProps = {
  fields: [
    {
      title: '输入框',
      key: 'input',
      ele_type: 'input'
    },
    {
      title: '下拉选择框',
      key: 'select',
      ele_type: 'select',
      options: [
        '卡比兽',
        '拦堵熊',
        '拉普拉斯',
        '太阳伊布'
      ].map((label, value) => ({ label, value }))
    },
    {
      title: '单选框',
      key: 'radio',
      ele_type: 'radio',
      options: [
        '霜雪千年',
        '蓝二乘',
        '雨声残响',
        '花与麦芽糖'
      ].map((label, value) => ({ label, value }))
    },
    {
      title: '级联选择',
      key: 'cascader',
      ele_type: 'cascader',
      options: [
        {
          value: 'guangdong',
          label: '广东',
          children: [
            {
              value: 'guangzhou',
              label: '广州'
            }
          ]
        }
      ]
    },
    {
      title: '日期框',
      key: 'date',
      ele_type: 'date'
    },
    {
      title: '周期框',
      key: 'weekdate',
      ele_type: 'date.week'
    },
    {
      title: '月期框',
      key: 'monthdate',
      ele_type: 'date.month'
    },
    {
      title: '范围日期框',
      key: 'rangedate',
      ele_type: 'date.range'
    }
  ],
  rules: {
    input: true
  },
  initValue: {
    input: '我是默认值',
    select: '2',
    radio: '2'
  },
  api
}
```