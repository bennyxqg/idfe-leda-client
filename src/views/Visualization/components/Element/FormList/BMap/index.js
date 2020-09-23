import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Switch, Button, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'

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
    console.log('--------props.data--------', props.data)
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
        name='zIndex' label="层级:">
        <InputNumber />
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
      <Form.Item
        name='markerIconUrl' label="标注图片:">
        <ImgUpload />
      </Form.Item>
      <div className='pad-l-90'>
          <span style={{
            color: '#999'
          }}>
            图标尺寸为21*31，不传则为默认图标
          </span>
        </div>
      <Row className='pad-l-20'>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 10}}
            wrapperCol={{span: 14}}
            name={['position', 'lng']} label="经度:">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{span: 10}}
            wrapperCol={{span: 14}}
            name={['position', 'lat']} label="纬度:">
            <InputNumber />
          </Form.Item>
        </Col>
        <div className='pad-l-72'>
          <span style={{
            color: '#999'
          }}>
            请通过
            <a 
              target='_blank'
              rel="noopener noreferrer"
              href='http://api.map.baidu.com/lbsapi/getpoint/index.html'>百度地图拾取坐标系统</a>
              获取经纬度
          </span>
        </div>
      </Row>
      <Form.Item
        valuePropName="checked"
        name='disableDragging' label="禁止拖拽:">
        <Switch />
      </Form.Item>
      <Form.Item
        valuePropName="checked"
        name='disableZoom' label="禁止缩放:">
        <Switch />
      </Form.Item>
    </Form>
    
    </div>
})

export default Index