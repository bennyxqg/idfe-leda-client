import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Switch, Button, Form, Input, message, InputNumber, Select, Radio } from 'antd';
const { Option } = Select;

const layout = {
labelCol: { span: 6 },
wrapperCol: { span: 6 },
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
  </Form>
</>
)
})

export default Index
