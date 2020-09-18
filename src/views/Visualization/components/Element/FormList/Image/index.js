import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const Index = React.forwardRef((props, ref) => {

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    ref: ref.current
  }));

  useEffect(() => {
    if(props.data) {
      form.setFieldsValue(props.data)
    }
  }, []);

  return <div >
    <Form
      {...layout}
      requiredMark={false}
      initialValues={{}}
      ref={ref}
      form={form}
    >
      <Form.Item
        rules={[{ required: true, message: '请输入层级' }]}
        name='zIndex' label="层级:">
        <InputNumber />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: '请上传图片' }]}
        name='imgUrl' label="上传图片:">
        <ImgUpload />
      </Form.Item>
      <Row className='pad-l-35'>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 8}}
            wrapperCol={{span: 10}}
            name={['style', 'width']} label="宽度:">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 8}}
            wrapperCol={{span: 10}}
            name={['style', 'height']} label="高度:">
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
      <Row className='pad-l-35'>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 8}}
            wrapperCol={{span: 10}}
            name={['style', 'left']} label="x:">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 8}}
            wrapperCol={{span: 10}}
            name={['style', 'top']} label="y:">
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </div>
})

export default Index