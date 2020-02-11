# 列表组件

列表是后台的灵魂了

## BaseList Props

prop属性 | 类型 | 默认值 | 说明 
- | - | - | - 
fields | field[] | [] | 列表项
data | object | {} | 数据源
setting | object | 默认值如下 | 设置项
handler | object | {} | 各种乱七八糟的回调事件
api | object | null ｜你需要传入一个引用对象，组件初始化时会暴露一些快捷的api给父组件

列表项设置 :  **全部继承antd**

### data
属性 | 类型 | 默认值 | 说明
- | - | - | - 
list | array | null | 表单数据
current | number | 1 | 当前页码
total | number | 0 | 数据总条数
size | number | `PAGESIZEOPTIONS`第一项 | 当前的分页数

> 注 ：PAGESIZEOPTIONS即列表组件默认分页数

### settting : 

属性 | 类型 | 默认值 | 说明
- | - | - | - 
hasPagination | boolean | true | 是否显示分页栏
hasBoreder | boolean | true | 是否有边框
hasRowSelection | boolean | false | 是否有选中框
selectedRowKeys | array | [] | 指定选中项的key数组


### handler如下 : 

事件名 | 说明 | 形参
- | - | - 
onSearch | 使用plus组件时，点击搜索触发事件 | (formResult,data)
onReset | 使用plus组件时，点击重置触发事件 | 默认根据(传入数组)清空表单组件状态（不传全请），再次触发onSearchClick，如果你需要将表单状态提升到父组件，请覆写该事件
onPageChange | 页码变更 | (pageNum,pageSize)
onSizeChange | 页数变更 | (pageNum,pageSize)

