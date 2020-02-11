import React from "react";
// 导入样式文件
import styles from "./index.less";
// 导入路由文件
import router from "@s/router";
import { Icon, Tag, Affix } from "antd";
import { withRouter } from "react-router-dom";
import AppBus from "@u/appBus";
const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple"
];
class Tabs extends React.Component {
  constructor(props) {
    super(props);
    // 初始化state
    this.state = {
      routeList: []
    };
  }
  // 点击切换路由
  handleClick(path) {
    // 解构路由对象
    const { history } = this.props;
    history.replace(path);
  }
  switchTab = path => {
    const { routeList } = this.state;
    const result = router.find(item => item.path === path);
    if (result) {
      if (routeList.length <= 0) {
        this.setState({ routeList: [result] });
      } else {
        if (!~routeList.findIndex(item => item.path === path)) {
          this.setState({ routeList: routeList.concat(result) });
        }
      }
    }
    this.forceUpdate();
  };
  componentDidMount() {
    // 箭头函数使this静态化，就算是当作参数传递 this的指向也不会改变
    
    this.switchTab(this.props.location.pathname);
    AppBus.register("switchTab", this.switchTab);
    AppBus.register("closeTab", this.closeTab);
  }

  // 关闭页签
  closeTab = (path,cbf)=>{
    const { history } = this.props
    const index = this.state.routeList.findIndex(item => item.path === path);
    const result = [
      ...this.state.routeList.slice(0, index),
      ...this.state.routeList.slice(index + 1)
    ];
    this.setState(
      {
        routeList: result
      },
      () => {
        if(cbf) { return  cbf()}
        history.replace(result[result.length - 1].path);
      }
    );
  }

  render() {
    // 将location对象解构
    const { location } = this.props;
    // 提取pathname
    const { pathname } = location;
    const { routeList } = this.state;
    return (
      <Affix offsetTop={60}>
        <div className={styles.tabs}>
          {routeList.map((item, index) => {
            const className = pathname === item.path ? styles.current : null;
            return (
              <Tag
                closable={!className}
                onClose={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.closeTab(item.path);
                }}
                style={{minWidth:'50px'}}
                className={className}
                onClick={this.handleClick.bind(this, item.path)}
                key={index}
                color={colors[index]}
              >
                {item.name}
              </Tag>
            );
          })}
        </div>
      </Affix>
    );
  }
}

export default withRouter(Tabs);
