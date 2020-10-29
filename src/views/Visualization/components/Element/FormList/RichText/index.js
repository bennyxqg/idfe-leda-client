import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import {cloneDeep} from 'lodash'
import Editor from '@/components/ReactQuill'

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
      form.setFieldsValue(dataTemp)
    }
  }, []);

  

  // 富文本组件
  const RichTextComp = (subProps) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [editorContent, setEditorContent] = useState('')

    let editorInstance = null

    // 显示富文本编辑器
    const showEditor = () => {
      setModalVisible(true)
    }

    // 关闭弹窗
    const handleCancel = e => {
      setModalVisible(false)
    }
    // 确认富文本的内容
    const handleEditorContent = e =>{
      setModalVisible(false)
      if(editorInstance) {
        if(subProps.onChange) {
          subProps.onChange(editorInstance.submitContent())
        }
      }
    }

    return (<div>
      <Button type='primary' onClick={() => {showEditor()}}>编辑富文本</Button>
      <Modal
        title="富文本内容"
        width="50%"
        visible={modalVisible}
        onOk={() => {handleEditorContent()}}
        onCancel={() => {handleCancel()}}
      >
        <Editor
          value={subProps.value} 
          ref={e => {
            editorInstance = e;
          }}
        />
      </Modal>
    </div>)
  }

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
      {/* <Form.Item
        rules={[{ required: true, message: '请输入文字' }]}
        name='text' label="文字:">
        <TextArea rows={4} />
      </Form.Item> */}

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
      <Row className='pad-l-20'>
        <Form.Item name={['text']}>
          <RichTextComp />
        </Form.Item>
      </Row>
    </Form>
    
  </div>
})

export default Index