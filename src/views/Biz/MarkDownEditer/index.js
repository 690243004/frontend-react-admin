import React, { useState } from 'react'
import MDEditer from '@c/MDEditer'

export default () => {
  const [data, setData] = useState('')
  const onChange = e => {
    setData(e.target.value)
  }
  return <MDEditer {...{ data, onChange }}></MDEditer>
}
