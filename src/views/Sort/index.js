import React, { Component } from "react";

import Actions from "@a/actions";
import mapDispatchToProps from "@u/mapDispatchToProps";
import { connect } from "react-redux";
import { Form, Button, Modal, Input } from "antd";
const namespace = "sortMod";
const confirm = Modal.confirm;
import ListPage from "@c/ListPage";
const width = 100;
import { get } from "lodash";
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
class Sort extends React.Component {
  constructor(props) {
    super();
    this.state = {
      page: 1,
      size: 10
    };
  }
  componentDidMount() {
    this.props.action.getSortList(this.state);
  }

  inputChange(name, value) {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}updateModel`,
      payload: { name, value }
    });
  }
  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const { dispatch, action, modelObj } = this.props;
      const { params = {} } = modelObj;
      action
        .saveSort({ ...params, ...this.props.form.getFieldsValue() })
        .then(res => {
          const { code } = res;
          if (code === 0) {
            this.inputChange("modalVisible", false);
            action.getSortList({ ...this.state });
          }
        });
    });
  }

  render() {
    const { dispatch, modelObj, form, action } = this.props;
    // 获取控件的值
    const { getFieldDecorator, getFieldsValue } = form;
    const {
      modalVisible,
      dataSource = [],
      total,
      current,
      params = {}
    } = modelObj;
    const { inputChange, state } = this;
    const { deleteSort, getSortList } = action;
    const pageProps = {
      columns: [
        {
          field: "ID _id",
          width,
          render: (value, row, index) => index
        },
        {
          field: "标签名 label",
          width
        },
        {
          field: "父分类ID parentId",
          width
        },
        {
          field: "创建时间 createTime",
          width,
          render: value => value.slice(0, 10)
        },
        {
          field: "简介 shortInfo",
          width
        },
        {
          field: "编辑 shoredittInfo",
          width,
          render: (value, row) => {
            return (
              <div>
                <a
                  onClick={() => {
                    confirm({
                      title: "确定删除吗?",
                      okText: "确认",
                      okType: "primary",
                      cancelText: "取消",
                      onOk() {
                        deleteSort(row).then(res => {
                          if (res.code === 0) {
                            getSortList(state);
                          }
                        });
                      },
                      onCancel() {}
                    });
                  }}
                >
                  删除
                </a>
                <a
                  onClick={() => {
                    this.inputChange("params", row);
                    this.inputChange("modalVisible", true);
                  }}
                >
                  编辑
                </a>
              </div>
            );
          }
        }
      ],
      pagination: {
        total,
        defaultCurrent: current,
        showTotal: total => total,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: pageNum => {
          this.setState({ page: pageNum }, () => {
            this.props.action.getPagerList({ ...this.state });
          });
        }
      },
      api: {
        url: "/sort/list",
        method: "post"
      },
    };
 
    return (
      <div>
        <div style={{ textAlign: "right", marginBottom: "16px" }}>
          <Button
            type="primary"
            onClick={() => {
              inputChange.call(this, "modalVisible", true);
              this.inputChange("params", {});
            }}
          >
            {" "}
            添加
          </Button>
        </div>
        <ListPage {...pageProps} dataSource={dataSource} />
        {modalVisible && (
          <Modal
            title="分类"
            onOk={() => {
              this.handleSubmit();
            }}
            onCancel={inputChange.bind(this, "modalVisible", false)}
            visible={true}
          >
            <Form.Item label="分类标签名" {...formItemLayout}>
              {getFieldDecorator("label", {
                initialValue: get(params, "label"),
                rules: [
                  {
                    required: true,
                    message: "请输入标签名"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="父资源ID" {...formItemLayout}>
              {getFieldDecorator("parentId", {
                initialValue: get(params, "parentId"),
                rules: [
                  {
                    required: true,
                    message: "请输入父资源"
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Modal>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { modelObj: state[namespace] };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Sort));
