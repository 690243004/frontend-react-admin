import React from "react";
import "./index.less";
import { Avatar, Badge, Popover, notification, Button } from "antd";
import { withRouter } from "react-router-dom";
import icon from "@s/assets/images/avatar.png";
import logo from "@s/assets/images/logo.png";
import store from "@s/store";
import * as userAction from "@s/store/actions/userAction";
// 导入事件车
import EventEitter from "@s/utils/EventEmitter";

let key;

export default withRouter(({ isCollapsed, history }) => {
  const onCollapseHandler = () => {
    EventEitter.emit("collapse", !isCollapsed);
  };

  const PopoverHoc = component => () => (
    <Popover placement="bottom" trigger="hover" content={<PopoverContent />}>
      {component}
    </Popover>
  );

  const NamePop = PopoverHoc(<a>nameless</a>);

  // 退出登录逻辑
  const logout = () => {
    store.dispatch(
      userAction.updateModel({
        name: "user",
        value: null
      })
    );
    history.replace("/login");
    notification.close(key);
  };

  const openNotification = () => {
    key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={logout}>
        确认
      </Button>
    );
    notification.open({
      message: "Notification Title",
      description: "是否退出登录",
      btn,
      key
    });
  };

  const PopoverContent = () => (
    <div className="popover-content">
      <li className="popover-content-item">
        <a>设置</a>
      </li>
      <li className="popover-content-item" onClick={openNotification}>
        <a>退出</a>
      </li>
    </div>
  );

  return (
    <div className="header">
      <div className="header-logo">
        <img onClick={onCollapseHandler} src={logo} />
        <span>{!isCollapsed && "Ant Design"}</span>
      </div>
      <div className="header-avatar">
        <Badge count={1}>
          <Avatar size="large" src={icon} />
        </Badge>
        <span>
          <NamePop />
        </span>
      </div>
    </div>
  );
});
