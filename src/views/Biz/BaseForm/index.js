import React from "react";
import readme from "./README.md";
import code from "./code.md";
import { BaseFormPlus } from "@c/BaseForm";
import { Button, message } from "antd";
import { baseFormProps } from "../mock";
import BackToTop from "@c/BackToTop";
export default () => {
  const api = {};
  let ref = null;
  const onSubmitHandler = () => {
    const result = api.getResult();
    message.success(JSON.stringify(result));
  };
  return (
    <div>
      <div
        style={{ marginBottom: "20px" }}
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: readme }}
      ></div>

      <BaseFormPlus ref={dom => (ref = dom)} {...{ ...baseFormProps, api }}>
        <div style={{ textAlign: "right" }}>
          <Button type="primary" onClick={onSubmitHandler}>
            提交表单
          </Button>
        </div>
      </BaseFormPlus>

      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: code }}
      ></div>

      <BackToTop />
    </div>
  );
};
