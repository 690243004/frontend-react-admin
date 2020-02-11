import React from "react";
import Wangeditor from "@c/Wangeditor/Wangeditor";
import { bindActionCreators } from "redux";
import Actions from "@a/actions";
import { connect } from "react-redux";
import { Modal, Button, Input, Form, Select } from "antd";
import ListPage from "@c/ListPage";
import { get } from "lodash";
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 8 }
};
// 命名空间
const namespace = "pagerMod";
const confirm = Modal.confirm;
// 公共width
const width = 100;
const Option = Select.Option;
// 视图层定义
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      size: 10
    };
  }
  inputChange(name, value) {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}updateModel`,
      payload: { name, value }
    });
  }

  handleSubmit() {
    let self = this;
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const { dispatch, action, modelObj } = this.props;
      const { params } = modelObj;
      action
        .addPager({
          ...params,
          ...this.props.form.getFieldsValue(),
          content: this.ref.editor.txt.html()
        })
        .then(res => {
          const { code } = res;
          if (code === 0) {
            this.inputChange("modalVisible", false);
            action.getPagerList({ ...this.state });
          }
        });
    });
  }

  // WangeEditor ref
  ref = "";

  // 组件加载完毕
  componentDidMount() {
    this.props.action.getSortAll();
  }
  render() {
    const {  modelObj, form, action } = this.props;
    // 获取控件的值
    const { getFieldDecorator, getFieldsValue } = form;
    const {
      modalVisible,
      total,
      current,
      params = {},
      options = []
    } = modelObj;
    const { inputChange, state } = this;
    const { deletePager, getPagerList } = action;
    // 列表列
    const pageProps = {
      columns: [
        {
          field: "序号 index",
          width,
          render: (value, row, index) => index
        },
        {
          field: "标题 title",
          width
        },
        {
          field: "分类 sort",
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
                        deletePager(row).then(res => {
                          if (res.code === 0) {
                            getPagerList(state);
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
                    // 设置编辑器内容
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
        url: "/pager/list",
        method: "post"
      },
      search: [
        {
          title: "标题 title",
          elem_type: "Input"
        },
        {
          title: "分类 sort",
          elem_type: "Input"
        },
        {
          title: "简介 shortInfo",
          elem_type: "Input"
        }
      ]
    };
    return (
      <div>
        <ListPage {...pageProps} >
          <div>
            <Button
              type="primary"
              onClick={() => {
                inputChange.call(this, "modalVisible", true);
                inputChange.call(this, "params", {});
              }}
            >
              添加
            </Button>
          </div>
        </ListPage>
        {modalVisible && (
          <Modal
            width={800}
            centered={true}
            title="文本编辑器"
            onOk={() => {
              this.handleSubmit();
            }}
            onCancel={inputChange.bind(this, "modalVisible", false)}
            visible={true}
          >
            <Form.Item label="添加文章标题" {...formItemLayout}>
              {getFieldDecorator("title", {
                initialValue: get(params, "title"),
                rules: [
                  {
                    required: true,
                    message: "请输入文章标题"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="添加简介" {...formItemLayout}>
              {getFieldDecorator("shortInfo", {
                initialValue: get(params, "shortInfo"),
                rules: [
                  {
                    required: true,
                    message: "请输入简介"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="选择分类" {...formItemLayout}>
              {getFieldDecorator("sortId", {
                initialValue: get(params, "sortId"),
                rules: [
                  {
                    required: true,
                    message: "请选择分类"
                  }
                ]
              })(
                <Select style={{ width: "100%" }}>
                  {options.map((item, index) => {
                    return (
                      <Option key={index} value={item._id}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Wangeditor
              content={get(params, "content")}
              ref={ref => {
                this.ref = ref;
              }}
            />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { modelObj: state[namespace] };
};

const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(Actions, dispatch),
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Page));
