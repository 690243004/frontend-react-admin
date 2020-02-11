import React from 'react'
import { Switch, Button } from 'antd'
export const baseFormProps = {
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
  setting: {
    maxNum: 5
  }
}

export const plusFormProps = {
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
  setting: {
    maxNum: 3
  }
}

export const baseTableProps = {
  fields: [
    {
      title: '序号',
      dataIndex: 'index',
      render: (value, row, index) => index + 1
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (value, row, index) => '标题' + index
    },
    {
      title: '描述',
      dataIndex: 'desc',
      render: () => '...'
    },
    {
      title: '简介',
      dataIndex: 'shortInof',
      render: () => '这是简介'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: () => <Switch defaultChecked />
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: () => '2019/10/10'
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 150,
      render: () => (
        <>
          <Button style={{ marginRight: '5px' }} size="small" type="primary">
            编辑
          </Button>
          <Button size="small">删除</Button>
        </>
      )
    }
  ],
  data: {
    list: new Array(5).fill({
      index: 1
    }),
    current: 1,
    pageSize: 10,
    total: 100
  },
  handler: {
    onPageChange: (num, size) => {},
    onSizeChange: (num, size) => {}
  },
  setting: {
    hasRowSelection: true
  }
}
