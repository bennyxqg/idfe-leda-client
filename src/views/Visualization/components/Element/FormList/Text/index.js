import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import {cloneDeep} from 'lodash'
import FontStyleForm from '@/views/Visualization/components/Common/FontStyleForm/index'

const { TextArea } = Input;

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
      const dataTemp = cloneDeep(props.data)
      if(!props.data.style.align) {
        dataTemp.style.align = 'left'
      }
      form.setFieldsValue(dataTemp)
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
        name='zIndex' label="层级:">
        <InputNumber />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: '请输入文字' }]}
        name='text' label="文字:">
        <TextArea rows={4} />
      </Form.Item>

      <Row className='pad-l-20'>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 10}}
            wrapperCol={{span: 10}}
            name={['style', 'width']} label="宽度:">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 10}}
            wrapperCol={{span: 10}}
            name={['style', 'height']} label="高度:">
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
      <Row className='pad-l-20'>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 10}}
            wrapperCol={{span: 10}}
            name={['style', 'left']} label="x:">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 10}}
            wrapperCol={{span: 10}}
            name={['style', 'top']} label="y:">
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
      <Row className='pad-l-4'>
        <Col span={24}>
          <Form.Item
            labelCol={{span: 4}}
            wrapperCol={{span: 16}}
            name={['style', 'align']} label="位置:">
            <Radio.Group>
              <Radio value="left">居左</Radio>
              <Radio value="center">居中</Radio>
              <Radio value="right">居右</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    
    </div>
})

export default Index