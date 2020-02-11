import React, { useEffect, useState } from "react";
import { Icon,Table, Row, Col, Form, Input, Select, Button, DatePicker,Alert  } from "antd";
import { get, includes } from "lodash";
import request from "@u/request";
// 引入md5
import md5 from "js-md5";
import moment from "moment";
// 搜索框标签布局
const SEARCHFORMITEM = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
//搜索框布局
const SEARCHCOL = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 8 },
};

// 获取store方法
const getParamByStore = (namespace, type) => {
  const store_list = localStorage.getItem("store_list");
  if (!store_list) return {};
  let listStr = JSON.parse(store_list)[md5.hex(namespace)];
  return listStr ? listStr[type] : {};
};

// 设置store方法
const setParamIntoStore = (namespace, param, searchParam = {}) => {
  // 获取序列化名称
  const space = md5.hex(namespace);
  let temp = localStorage.getItem("store_list");
  let store_list = temp ? JSON.parse(temp) : undefined;
  if (!store_list) {
    const defaultStoreList = JSON.stringify({
      [space]: { param, searchParam }
    });
    localStorage.setItem("store_list", defaultStoreList);
  } else {
    store_list[space] = { param, searchParam };
    localStorage.setItem("store_list", JSON.stringify(store_list));
  }
};

const getPropsColumns = data => {
  return data.map(item => {
    let temp = {};
    if (item.field) {
      const vars = item.field.split(" ");
      temp.title = vars[0];
      temp.dataIndex = vars[1];
    }
    temp = Object.assign(temp, item);
    delete temp.field;
    return temp;
  });
};

const DEFAULT_UI = {
  bordered: false
};

const ListPage = props => {
  const { columns, api, search = [], form,rowSelect } = props;
  const namespace = get(props, "namespace", window.location.href);
  const ui = Object.assign({},DEFAULT_UI, get(props, "ui", {}));
  const promise = get(api, "promise");
  const { getFieldDecorator } = form;
  let rowSelection = null
  if(rowSelect) { 
    rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        setSeletedNum(selectedRowKeys.length)
        if(typeof rowSelect === 'function') { 
          rowSelect(selectedRowKeys, selectedRows)
        }
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };
  }
  // 重置按钮触发
  const onReset = () => {
    // 重置所有控件的值
    form.resetFields();
    setSearchParam({});
    setParam({ page: 1, size: 10 });
  };

  // 搜索表单提交
  const onSubmit = () => {
    setParam({ page: 1, size: param.size });
  };

  const getListData = async args => {
    try {
      const { promise, param, searchParam } = args;
      const { code, data } = await promise(Object.assign({},param,searchParam));
      if (code === 0) {
        setDataSource(get(data, "list"));
        setPagination({
          ...pagination,
          total: get(data, "total",0),
          current: get(param, "page"),
          pageSize: get(param, "size")
        });
        setParamIntoStore(namespace, param, searchParam);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 获取搜索栏组件的扩展属性
  const getSearchBarProps = qField => {
    //  获取扩展属性
    const getExtProps = (obj, exKeys) => {
      let tmpObj = {},
        keys = [];
      // 键名数组
      keys = Object.keys(obj);
      if (keys.length > 0) {
        keys.map((key, i) => {
          // 排除自定义的属性名，返回antd的属性名
          if (!includes(exKeys, key)) {
            tmpObj[key] = obj[key];
          }
        });
      }
      return tmpObj;
    };
    let exKeys = [
      "label",
      "elem_type",
      "elem_valid_type",
      "cmpt_items",
      "cmpt_field_name",
      "split_keys",
      "format"
    ];
    return getExtProps(qField, exKeys);
  };

  // -- state --
  // 数据源参数
  const [dataSource, setDataSource] = useState([]);
  const [param, setParam] = useState({
    page: 1,
    size: 10,
    ...getParamByStore(namespace, "param")
  });
  // 分页栏
  const [pagination, setPagination] = useState({
    defaultCurrent: 1,
    defaultPageSize: 10,
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => <span>共：{total}</span>,
    pageSizeOptions: ["5", "10", "20", "50", "100"],
    onChange: (page, size) => {
      setParam({ page, size });
    },
    onShowSizeChange: (page, size) => {
      setParam({ page: 1, size });
    }
  });
  // 搜索栏参数
  const [searchParam, setSearchParam] = useState(
    getParamByStore(namespace, "searchParam")
  );
  // 是否展开
  const [isCollaspe, setIsCollaspe] = useState(
    true
  );
  // 选中多少项
  const [seletedNum, setSeletedNum] = useState(
    0
  );

  useEffect(() => {
    getListData({ promise, param, searchParam });
  }, [param]);

  return (
    <div className="listPage">
      {search.length > 0 && (
        <Form>
          <Row style={{ marginBottom: "10px" }}>
            {search.map((qField, i) => {
              const titleArr = qField.title.split(" ");
              const label = titleArr[0];
              const key = titleArr[1];
              // 当长度大于1小于2或者isCollspe为false时显示更多搜索框
              const isVisible = i<2 || isCollaspe === false 
              // 文本输入框
              if ("Input" === "" + qField.elem_type) {
                return (
                  isVisible && <Col {...SEARCHCOL} key={"qField_" + i}>
                    <Form.Item {...SEARCHFORMITEM} label={label}>
                      {getFieldDecorator(`${key}`, {
                        initialValue: searchParam[key]
                      })(
                        <Input
                          {...getSearchBarProps(qField)}
                          onChange={e => {
                            setSearchParam({
                              ...searchParam,
                              [key]: e.target.value
                            });
                          }}
                          placeholder={`请输入${label}`}
                        />
                      )}
                    </Form.Item>
                  </Col>
                );
                // 下拉框
              } else if ("Select" === "" + qField.elem_type) {
                return (
                  isVisible && <Col {...SEARCHCOL} key={"qField_" + i}>
                    <Form.Item {...SEARCHFORMITEM} label={label}>
                      {getFieldDecorator(`${key}`, {
                        initialValue: searchParam[key]
                      })(
                        <Select
                          {...getSearchBarProps(qField)}
                          onChange={e => {
                            setSearchParam({
                              ...searchParam,
                              [key]: e
                            });
                          }}
                          placeholder={`请选择${label}`}
                        >
                          {getBoxList(qField).map((option, index) => (
                            <Select.Option
                              key={index}
                              value={option.value + ""}
                            >
                              {option.label}
                            </Select.Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                );
                // 日期框
              } else if ("DatePicker" === "" + qField.elem_type) {
                return (
                  isVisible && <Col {...SEARCHCOL} key={"qField_" + i}>
                    <Form.Item {...SEARCHFORMITEM} label={key}>
                      {getFieldDecorator(`${key}`, {
                        initialValue: searchParam[key]
                          ? moment(searchParam[key], "YYYY-MM-DD")
                          : undefined
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          {...getSearchBarProps(qField)}
                          format={get(qField, "format", "YYYY-MM-DD")}
                          onChange={(value, dateString) => {
                            setSearchParam({
                              ...searchParam,
                              [key]: dateString
                            });
                          }}
                        />
                      )}
                    </Form.Item>
                  </Col>
                );
              } else if ("RangePicker" === "" + qField.elem_type) {
                let initialValue = searchParam[key];
                // 默认返回字符串类型
                const paramsType = get(qField, "paramsType", "String");
                const format = get(qField, "format", "yyyy-MM-dd");
                if (!!initialValue) {
                  // 判断类型
                  const type = Object.prototype.toString.call(initialValue);
                  if (type === "[object Array]") {
                    initialValue = initialValue.map(value =>
                      moment(value, "yyyy-MM-dd")
                    );
                  }
                  if (type === "[object String]") {
                    initialValue = initialValue
                      .split(",")
                      .map(value => moment(value, "yyyy-MM-dd"));
                  }
                }
                return (
                  isVisible && <Col {...SEARCHCOL} key={"qField_" + i}>
                    <Form.Item {...SEARCHFORMITEM} label={label}>
                      {getFieldDecorator(`${key}`, {
                        initialValue: initialValue
                      })(
                        <RangePicker
                          style={{ width: "100%" }}
                          {...getSearchBarProps(qField)}
                          ranges={{
                            今天: [moment(), moment()],
                            这个月: [moment(), moment().endOf("month")]
                          }}
                          format={"YYYY-MM-DD"}
                          onChange={(value, dateString) => {
                            let result = "";
                            if (paramsType === "String") {
                              // 设置为字符串分割格式
                              result = dateString.join(",");
                            }
                            if (paramsType === "Array") {
                              result = dateString;
                            }
                            // 加隐藏域，使用两个参数 分别传递开始、结束时间
                            if (paramsType === "Split_key") {
                              let keys = get(qField, "split_key", []);
                              keys.forEach((key, index) => {
                                setSearchParam({
                                  ...searchParam,
                                  [key]: dateString[index]
                                    ? new Date(dateString[index]).format(format)
                                    : ""
                                });
                              });
                            }
                            setSearchParam({
                              ...searchParam,
                              [key]: result
                            });
                          }}
                        />
                      )}
                    </Form.Item>
                  </Col>
                );
              } else if ("CheckBox" === "" + qField.elem_type) {
                return (
                  isVisible && <Col {...SEARCHCOL} key={"qField_" + i}>
                    <Form.Item {...SEARCHFORMITEM} label={label}>
                      {getFieldDecorator(`${key}`, {
                        initialValue: searchParam[key]
                      })(
                        <CheckboxGroup
                          options={getBoxList(qField)}
                          {...getSearchBarProps(qField)}
                          onChange={e => {
                            setSearchParam({
                              ...searchParam,
                              [key]: e
                            });
                          }}
                        />
                      )}
                    </Form.Item>
                  </Col>
                );
              }
            })}
            <Col style={{ float: "right" }}>
              <Button
                type="primary"
                style={{ marginRight: "8px" }}
                onClick={onSubmit.bind(this)}
              >
                搜索
              </Button>
              <Button style={{ marginRight: "8px" }} onClick={onReset.bind(this)}>重置</Button>
              {isCollaspe===true && <a className="ant-dropdown-link" onClick={()=>{setIsCollaspe(false)}}>
                展开<Icon type="down" />
              </a>}
              {isCollaspe===false && <a className="ant-dropdown-link" onClick={()=>{setIsCollaspe(true)}}>
                收起<Icon type="up" />
              </a>}
            </Col>
            {props.children && <Col span={24}> {props.children}</Col>}
          </Row>
        </Form>
      )}
      {rowSelect && <Alert 
      showIcon 
      icon={<Icon type="exclamation-circle" />} 
      style={{marginBottom:"10px"}} 
      message={`已选择：${seletedNum}项`} type="success" />}
      <Table
        rowKey={(item, index) => index}
        columns={getPropsColumns(columns)}
        dataSource={dataSource}
        pagination={pagination}
        rowSelection = {rowSelection}
        {...ui}
      />
    </div>
  );
};

export default Form.create()(ListPage);
