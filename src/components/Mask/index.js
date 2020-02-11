import React from "react";
import { Spin, Icon, Alert } from "antd";
import "./index.less";

const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin />;

// 全屏loading
export default ({ text = "加载中" }) => (
  <div className="mask">
    <Spin indicator={antIcon} tip={text} />
  </div>
);
