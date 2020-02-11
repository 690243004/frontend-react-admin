import React from 'react'
const routeView = props => {
  props.abc.cb = function(){
    console.log("子组件")
  }
  return (<div>
    Children
  </div>)
}
export default routeView