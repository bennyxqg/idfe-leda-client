import React, {useState, useEffect} from "react";
import { Form, Button, Input, Radio, Row, message, Col } from "antd";
import ImgUpload from '@/components/ImgUpload'
import { siteInfo, editSiteInfo } from '@/http/hbasic'
import "./basic.less";
const { TextArea } = Input;

const GlobalConfig = (props) => {
  const [formParams, setFormParams] = useState({})

  const [form] = Form.useForm();

  useEffect(() => {
    getInfo()
  }, []);

  const getInfo = () => {
    siteInfo().then((rep) => {
      if(rep.error_code === 0) {
        if(rep.data) {
          setFormParams(rep.data)
          form.setFieldsValue(rep.data)
        }
      } else {
        message.error(rep.msg);
      }
    })
  }

  // 上传成功
  const uploadSuccess = (val) => {
    const data = {
      icon: val.data.url
    }
    setFormParams(Object.assign({}, formParams, data))
  }

  const onFinish = values => {
    const sendData = values
    let reqFunc = editSiteInfo
    sendData.icon = formParams.icon
    reqFunc(sendData).then((rep) => {
      if(rep.error_code === 0) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    })
  };

  const onFinishFailed = errorInfo => {
  };

  return (
    <div className="shadow-radius">
      <div style={{width: '600px', margin: 'auto'}}>
        <div style={{fontSize: '16px', fontWeight: '700', marginBottom: '16px'}}>基本信息</div>
        <Form labelCol={{ span: 4 }} 
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}>
          <Form.Item label="网站状态" name="status"
            rules={[{ required: true, message: '请选择网站状态' }]}
          >
            <Radio.Group>
              <Radio value={'1'}>开启</Radio>
              <Radio value={'0'}>关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="网站标题" name="title"
            rules={[{ required: true, message: '请输入网站标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="网站关键字" name="keywords">
            <Input />
          </Form.Item>
          <Form.Item label="网站描述" name="description">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label="上传图标">
            <ImgUpload 
              imgUrl={formParams.icon}
              successCB={(val) => {uploadSuccess(val)}}></ImgUpload>
          </Form.Item>
          <Row>
            <Col span={6} offset={4}>
              <Form.Item>
                <Button  type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default GlobalConfig