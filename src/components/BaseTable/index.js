import React, { createRef } from 'react'
import get from 'lodash/get'
import { Table, Button, Card } from 'antd'
import BaseForm from '../BaseForm'
const PAGESIZEOPTIONS = ['10', '20', '50', '100']

// 默认的获取行key方法
const getRowKey = (item, index) => index

// 显示总数的函数式组件
const Total = total => <span>共 : {total}</span>

// 生成抽象函数
const getAbstractMethod = (label, callerName) => () =>
  console.log(`${label} Warning : you should composite ${callerName} method`)

const BaseTable = props => {
  // 是否有分页栏
  const hasPagination = get(props, 'setting.hasPagination', true)
  // 是否有边框
  const hasBoreder = get(props, 'setting.hasBorder', false)
  // 是否有选中框
  const hasRowSelection = get(props, 'setting.hasRowSelection', false)
  // 表头
  const fields = get(props, 'fields', [])
  // 数据源
  const list = get(props, 'data.list', [])
  // 总数
  const total = get(props, 'data.total', 0)
  // 当前页码
  const current = get(props, 'data.current', 1)
  // 当前页数
  const size = get(props, 'data.size', PAGESIZEOPTIONS[0])

  let pagination, onPageChange, onSizeChange, rowSelection
  // 分页有关逻辑
  if (hasPagination) {
    onPageChange = get(
      props,
      'handler.onPageChange',
      getAbstractMethod('BaseList', 'onPageChange')
    )
    onSizeChange = get(
      props,
      'handler.onSizeChange',
      getAbstractMethod('BaseList', 'onSizeChange')
    )
    pagination = {
      total,
      current,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: PAGESIZEOPTIONS,
      showTotal: Total,
      onChange: onPageChange,
      onShowSizeChange: onSizeChange
    }
  }
  if (hasRowSelection) {
    rowSelection = {
      onChange: get(
        props,
        'handler.onRowSelect',
        getAbstractMethod('BaseList', 'onRowSelect')
      ),
      selectedRowKeys: get(props, 'setting.selectedRowKeys', [])
    }
  }

  return (
    <Table
      rowSelection={rowSelection}
      pagination={pagination}
      dataSource={list}
      columns={fields}
      rowKey={getRowKey}
      bordered={hasBoreder}
    ></Table>
  )
}

export default BaseTable

// 组合组件
export const BaseTablePlus = props => {
  // 获取两个组件的props
  const formProps = get(props, 'formProps')
  const tableProps = get(props, 'tableProps')
  // 生成表单的ref
  const formRef = createRef()
  const onSearchClick = get(
    props,
    'tableProps.handler.onSearchClick',
    getAbstractMethod('BaseListPlus', 'onSearch')
  )
  const onResetClick = get(props, 'tableProps.handler.onReset', () => {
    formRef.current.resetFields()
    onSearchClick()
  })

  return (
    <Card>
      <BaseForm {...formProps} ref={formRef}>
        <div style={{ textAlign: 'right', marginBottom: '6px' }}>
          <Button type="primary" style={{ marginRight: '6px' }}>
            搜索
          </Button>
          <Button onClick={onResetClick}>重置</Button>
        </div>
      </BaseForm>
      <BaseTable {...tableProps}></BaseTable>
    </Card>
  )
}
