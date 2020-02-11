// 基于react-route4封装的route组件
import React from "react";
import { withRouter, Redirect, Route } from "react-router-dom";
import { notification } from "antd";
import { connect } from "react-redux";
class AuthRoute extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.hasLogin = this.props.model.user !== null;
  }

  componentDidMount() {
    if (!this.hasLogin /*  && process.env.NODE_ENV !== 'development' */) {
      notification.open({
        message: "当前用户信息已过期",
        description: "请重新登录"
      });
    }
  }

  render() {
    // 此处判断UserMod是否有信息
    if (!this.hasLogin /*  && process.env.NODE_ENV !== 'development' */) {
      return <Redirect to="/login" />;
    }
    return <Route {...this.props}></Route>;
  }
}

const mapStateToProps = state => {
  return {
    model: state["user"]
  };
};

export default withRouter(connect(mapStateToProps)(AuthRoute));
