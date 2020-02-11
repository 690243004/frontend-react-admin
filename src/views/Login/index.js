import React from "react";
import "./index.scss";
import { Card, message, Input, Form, Button, Icon, Tooltip } from "antd";
import * as userAction from "@s/store/actions/userAction";
import { Redirect } from "react-router-dom";
import connect from "@u/connect";
import Mask from "@c/Mask";
class RouteView extends React.Component {
  state = {
    isLoading: false
  };
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  async onLogin(e) {
    e.preventDefault();
    const { form } = this.props;
    const { validateFields } = form;
    const callback = () => {
      validateFields((err, value) => {
        const judgeArr = [undefined, ""];
        // 此处进行登录逻辑
        if (judgeArr.includes(username) || judgeArr.includes(value.password)) {
          this.setState({ isLoading: false });
          return message.info("用户名或密码不能为空");
        } else {
          try {
            this.dispatch(userAction.loginAction(value));
          } catch (err) {
            console.log(err);
          }
        }
      });
    };
    this.setState({ isLoading: true }, callback);
  }

  render() {
    const { model, form } = this.props;
    const { getFieldDecorator } = form;
    const { isLoading } = this.state;
    const bodyStyle = {
      padding: "20px 50px 0"
    };

    if (model.user) {
      // 如果已经登录 重定向到首页
      return <Redirect to="/"></Redirect>;
    }

    const CardText = ({ text }) => <div className="title">{text}</div>;

    return (
      <div className="login-wraper">
        {isLoading && <Mask />}
        <Card
          className="login-content"
          title={<CardText text="Frontend_React" />}
          bodyStyle={bodyStyle}
        >
          <Form onSubmit={this.onLogin.bind(this)}>
            <Form.Item>
              {getFieldDecorator("username")(
                <Input
                  placeholder="账户名：admin"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  suffix={
                    <Tooltip title="Extra information">
                      <Icon
                        type="info-circle"
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password")(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="密码：admin"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(connect("user")(RouteView));
