import React, { createRef, useEffect } from 'react'
import { Icon, Tooltip } from 'antd'
import './index.less'
import marked from 'marked'
import get from 'lodash/get'
marked.setOptions({
  // marked 设置
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
})

// 生成抽象函数
const getAbstractMethod = (label, callerName) => () =>
  console.log(`${label} Warning : you should composite ${callerName} method`)

// 生成状态按钮的HOC组件
const ActionItemHOC = Component => {
  return props => (
    <div className="md-editer-action-item" {...props}>
      <Component />
    </div>
  )
}

const Editer = ({ onChange, compilerRef }) => {
  const Upload = ActionItemHOC(() => (
    <Tooltip title="插入图片">
      <Icon type="file-image" />
    </Tooltip>
  ))
  const Tip = ActionItemHOC(() => (
    <Tooltip title="markDown语法提示">
      <Icon type="file" />
    </Tooltip>
  ))
  const Sava = ActionItemHOC(() => (
    <Tooltip title="保存">
      <Icon type="save" />
    </Tooltip>
  ))
  const textRef = createRef()
  // 装饰onChange函数
  const _onChange = e => {
    onChange(e)
    // TODO 当编辑时，确认光标位置 编译区域滚动到光标区域
  }
  // 同步滚动功能
  useEffect(() => {
    textRef.current.onscroll = e => {
      const top = e.target.scrollTop
      // 光标移动过程中， compilerRef.current获取不到了
      if (compilerRef.current && compilerRef.current.scrollTo) {
        compilerRef.current.scrollTo(0, top)
      }
    }
    return () => {
      if (textRef.current && textRef.current.onscroll) {
        textRef.current.onscroll = null
      }
    }
  })
  return (
    <div className="md-editer">
      <div className="md-editer-action">
        <Upload />
        <Tip />
        <Sava style={{ float: 'right' }} />
      </div>
      <textarea
        ref={textRef}
        onChange={_onChange}
        className="md-editer-area"
      ></textarea>
    </div>
  )
}

const Compiler = React.forwardRef((props, ref) => {
  const strHtml = marked(props.data)
  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: strHtml }}
      className="md-compiler markdown-body"
    ></div>
  )
})

export default props => {
  const onChange = get(
    props,
    'onChange',
    getAbstractMethod('MDEditer', 'onChange')
  )
  const data = get(props, 'data', '')
  const compilerRef = createRef()
  return (
    <div className="md-wraper">
      <Editer onChange={onChange} compilerRef={compilerRef} />
      <Compiler data={data} ref={compilerRef} />
    </div>
  )
}
