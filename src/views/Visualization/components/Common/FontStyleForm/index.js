import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Modal, Button, Form, Input, Row, InputNumber, Col, Switch } from 'antd';
import CommonUpload from '@/components/CommonUpload/index'

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
      console.log('----props.data---666---', props.data)
      form.setFieldsValue(props.data)
    }
  }, []);

  return (
    <>
      <Form
        {...layout}
        requiredMark={false}
        initialValues={{}}
        ref={ref}
        form={form}
      >
        <Row className='pad-l-20'>
          <Col span={8}>
            <Form.Item
              labelCol={{span: 10}}
              wrapperCol={{span: 10}}
              name='fontColor' label="字体颜色:">
              <Input type='color' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{span: 10}}
              wrapperCol={{span: 10}}
              name='fontSize' label="字体大小:">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row className='pad-l-20'>
          <Col span={8}>
            <Form.Item
              labelCol={{span: 10}}
              wrapperCol={{span: 10}}
              name='letterSpacing' label="字体间距:">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{span: 10}}
              wrapperCol={{span: 10}}
              name='lineHeight' label="行高:">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row className='pad-l-20'>
          <Col span={8}>
            <Form.Item
              valuePropName="checked"
              labelCol={{span: 10}}
              wrapperCol={{span: 10}}
              name='isBlod' label="是否加粗:">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
})

export default Index