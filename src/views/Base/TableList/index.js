import React, { useEffect } from 'react'
import ListPage from '@c/ListPage'
import { Tooltip, Switch, Divider } from 'antd'
const routeView = props => {
  const width = 100
  let getSelectKeys = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  }
  // 列表列
  const pageProps = {
    columns: [
      {
        field: '序号 index',
        width,
        render: (value, row, index) => index + 1
      },
      {
        field: '标题 title',
        width,
        render: (value, row, index) => `标题${index + 1}`
      },
      {
        field: '描述 description',
        width,
        render: (value, row, index) => (
          <Tooltip title="这是一段描述">
            <span>...</span>
          </Tooltip>
        )
      },
      {
        field: '简介 shortInfo',
        width,
        render: (value, row, index) => <span>这是简介</span>
      },
      {
        field: '状态 status',
        width,
        render: () => (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            defaultChecked
          />
        )
      },
      {
        field: '更新时间 updateTime',
        width,
        render: () => '2015/01/01'
      },
      {
        field: '操作 edit',
        width,
        render: () => (
          <div>
            <span>
              <a>编辑</a>
            </span>
            <Divider type="vertical" />
            <span>
              <a>删除</a>
            </span>
          </div>
        )
      }
    ],
    api: {
      promise: async () => {
        return {
          code: 0,
          data: {
            list: new Array(10).fill({}),
            total: 10086
          }
        }
      }
    },
    search: [
      {
        title: '标题 title',
        elem_type: 'Input'
      },
      {
        title: '分类 sort',
        elem_type: 'Input'
      },
      {
        title: '文章ID pagerID',
        elem_type: 'Input'
      },
      {
        title: '简介 shortInfo',
        elem_type: 'Input'
      }
    ],
    rowSelect: getSelectKeys
  }
  return (
    <div>
      查询表格
      <ListPage {...pageProps}></ListPage>
    </div>
  )
}

export default routeView
