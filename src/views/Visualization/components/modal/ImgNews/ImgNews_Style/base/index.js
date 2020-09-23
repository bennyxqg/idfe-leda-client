import React, {useState, useEffect, useRef, useContext, useImperativeHandle} from "react";
import { InputNumber, Switch, Row, Col, Space, Button, Form, Input, message, Select, Collapse, Radio, Slider } from 'antd';
import BgStyleForm from '@/views/Visualization/components/Common/BgStyleForm/index_whole'

const { Panel } = Collapse;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const Index = React.forwardRef((props, ref) => {
  
  const [form] = Form.useForm();

  const bgFormRef = useRef();
  useImperativeHandle(ref, () => ({
    ref: ref.current,
    bgFormRef: bgFormRef
  }));

  useEffect(() => {
    if(props.data && props.data.data) {
      form.setFieldsValue(props.data.data.style.base)
    }
    console.log('---props.section----22233----', props.data)
  }, []);

  return <div  className='widgets-modal-wrapper'>
      {
        <div className='widgets-modal-inner imgnews-style-modal'>
          <Collapse defaultActiveKey={['1', '2']}>
            <Panel header="背景样式" key="1">
              <div>
                <BgStyleForm 
                  ref={bgFormRef}
                  data={props.data.data.style.base.bg}
                />
              </div>
            </Panel>
            <Panel header="基础样式" key="2">
              <Form
                {...layout}
                requiredMark={false}
                form={form}
                ref={ref}
              >

                <Form.Item
                  label="上内边距"
                >
                  <Form.Item
                    noStyle
                    name="paddingTop"
                  >
                    <InputNumber />
                  </Form.Item>
                  {/* <span className='mar-l-4'>px</span> */}
                </Form.Item>
                <Form.Item
                  label="下内边距"
                >
                  <Form.Item
                    noStyle
                    name="paddingBottom"
                  >
                    <InputNumber />
                  </Form.Item>
                  {/* <span className='mar-l-4'>px</span> */}
                </Form.Item>
                <Form.Item
                  label="高度"
                  name="height"
                >
                  <InputNumber />
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
        </div>
      }
    </div>
})

export default Index