import React from 'react'
import BaseTable from '@c/BaseTable'
import { BaseTablePlus } from '@c/BaseTable'
import { baseTableProps, plusFormProps } from '../mock'
import readme1 from './README1.md'
import readme2 from './README2.md'

export default () => {
  const plusProps = {
    formProps: plusFormProps,
    tableProps: baseTableProps
  }
  return (
    <>
      <div
        style={{ marginBottom: '20px' }}
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: readme1 }}
      ></div>
      <BaseTable {...baseTableProps} />
      <div
        style={{ marginBottom: '20px' }}
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: readme2 }}
      ></div>
      <BaseTablePlus {...plusProps} />
    </>
  )
}
