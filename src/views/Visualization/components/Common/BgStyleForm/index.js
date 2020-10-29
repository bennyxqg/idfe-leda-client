import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Select, Radio } from 'antd';
import CommonUpload from '@/components/CommonUpload/index'

const Index = (props) => {
  const [bgType, setBgType] = useState(null)

  useEffect(() => {
    setBgType(props.defaultType)
  }, [props.defaultType]);

  const changeType = (e) => {
    console.log('------changeType------', e.target.value)
    setBgType(e.target.value)
  }

  return (
    <>
      <Form.Item
        label="背景类型"
        name={['bg', 'bgType']}
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
          name={['bg', 'bgColor']}
        >
          <Input type='color' />
        </Form.Item>
      }
      {
        bgType == 2 &&
        <Form.Item
          name={['bg', 'bgImg']}
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
          name={['bg', 'bgVideo']}
        >
          <CommonUpload 
            className='mar-l-20'
            btnLabel='上传视频'
            placeholder='请输入视频地址'
          />
        </Form.Item>
      }
    </>
  )
}

export default Index