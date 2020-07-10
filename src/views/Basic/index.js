import React, { PureComponent } from "react";
import { Form, Button, Input, Radio, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./basic.less";
const { TextArea } = Input;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default class GlobalConfig extends PureComponent {
  state = {
    basicData: {
      status: 1,
    },
  };
  onChange = (e) => {
    this.setState({
      basicData: {
        ...this.state.basicData,
        status: e.target.value,
      },
    });
  };
  submit = (e) => {
    console.log(this.state.basicData);
    console.log("提交");
  };
  cancel = (e) => {
    console.log("取消");
  };
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  handleChange = (type, info) => {
    console.log(type, info);

    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          basicData: {
            ...this.state.basicData,
            imageUrl,
          },
          loading: false,
        })
      );
    }
  };
  render() {
    const { basicData } = this.state;
    return (
      <div className="shadow-radius">
        <div>基本信息</div>
        <Form labelCol={{ span: 4 }} layout="horizontal">
          <Form.Item label="网站状态">
            <Radio.Group onChange={this.onChange} value={basicData.status}>
              <Radio value={1}>开启</Radio>
              <Radio value={2}>关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="网站标题">
            <Input />
          </Form.Item>
          <Form.Item label="网站关键字">
            <Input />
          </Form.Item>
          <Form.Item label="网站描述">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label="上传证件">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {basicData.imageUrl ? (
                <img
                  src={basicData.imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div className="ant-upload-text">Upload</div>
                </div>
              )}
            </Upload>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {basicData.imageUrl ? (
                <img
                  src={basicData.imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div className="ant-upload-text">Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item style={{ textAlign: "right", width: "100%" }}>
            <Button onClick={this.submit} type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={this.cancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
