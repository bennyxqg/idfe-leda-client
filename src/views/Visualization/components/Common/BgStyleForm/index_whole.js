import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Select, Radio } from 'antd';
import CommonUpload from '@/components/CommonUpload/index'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const Index = React.forwardRef((props, ref) => {
  const [bgType, setBgType] = useState(null)

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

  useEffect(() => {
    setBgType(props.defaultType)
  }, [props.defaultType]);

  const changeType = (e) => {
    setBgType(e.target.value)
  }

  return (
    <>
      <Form
        {...layout}
        requiredMark={false}
        initialValues={{}}
        ref={ref}
        form={form}
      >
      <Form.Item
        label="背景类型"
        name='bgType'
        rules={[{ required: true, message: '请选择背景类型' }]}
      >
        <Radio.Group onChange={changeType}>
          <Radio value={1}>
            <span className='mar-r-8'>颜色</span>
          </Radio>
          <Radio value={2}>
            <span className='mar-r-8'>图片</span>
          </Radio>
          <Radio value={3}>
            <span className='mar-r-8'>视频</span>
          </Radio>
        </Radio.Group>
      </Form.Item>
      {
        <Form.Item
          label="背景颜色"
          name='bgColor'
        >
          <Input type='color' />
        </Form.Item>
      }
      {
        bgType == 2 &&
        <Form.Item
          rules={[{ required: true, message: '请上传图片或输入图片地址' }]}
          name='bgImg'
        >
          <CommonUpload 
            className='mar-l-20'
            btnLabel='上传图片'
            placeholder='请输入图片地址'
          />
        </Form.Item>
      }
      {
        bgType == 3 &&
        <Form.Item
          name='bgVideo'
        >
          <CommonUpload 
            className='mar-l-20'
            btnLabel='上传视频'
            placeholder='请输入视频地址'
          />
        </Form.Item>
      }
      </Form>
    </>
  )
})

export default Index