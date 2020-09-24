import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Switch, Row, Form, Input, Col, InputNumber, Select, Radio } from 'antd';
import ImgUpload from '@/components/ImgUpload'

const { Option } = Select;

const layout = {
labelCol: { span: 6 },
wrapperCol: { span: 6 },
};
const subLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const Index = React.forwardRef((props, ref) => {

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    ref: ref.current
  }));

  useEffect(() => {
    if(props.data) {
      form.setFieldsValue({
        swiper: props.data
      })
    }
  }, []);

return (
<>
  <Form {...layout} requiredMark={false}         
    ref={ref}
    form={form}>
    <Form.Item label="显示轮播导航" valuePropName="checked" name={['swiper', 'nav' , 'show' ]}>
      <Switch />
    </Form.Item>
    <Form.Item label="轮播导航样式" name={['swiper', 'nav' , 'type' ]} rules={[{ required: true, message: '请选择轮播导航样式' }]}>
      <Select>
        <Option value="1">横线</Option>
        <Option value="2">点</Option>
      </Select>
    </Form.Item>
    <Form.Item label="导航激活颜色" name={['swiper', 'nav' , 'color' ]} rules={[{ required: true, message: '请选择导航激活颜色' }]}>
      <Input type='color' />
    </Form.Item>
    <Form.Item label="轮播时间间隔（毫秒）" name={['swiper', 'delay' ]} rules={[{ required: true, message: '请输入轮播时间间隔' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="是否自动轮播" name={['swiper', 'autoPlay' ]} 
      valuePropName="checked" rules={[{ required: true,
      message: '请选择是否自动轮播' }]}>
      <Switch />
    </Form.Item>
    <Form.Item label="显示前后按钮" name={['swiper', 'navBtn', 'show' ]} 
      valuePropName="checked" >
      <Switch />
    </Form.Item>
    <Row className='pad-l-4'>
      <Col span={12}>
        <Form.Item 
          {...subLayout}
          label="前进按钮图片" 
          name={['swiper', 'navBtn', 'nextBg' ]}>
          <ImgUpload />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item 
          {...subLayout}
          label="后退按钮图片" 
          name={['swiper', 'navBtn', 'prevBg' ]}>
          <ImgUpload />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</>
)
})

export default Index
