import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Switch, Button, Form, Input, message, Modal, Select, Radio } from 'antd';
import {cloneDeep} from 'lodash'
import {addPage, editPage} from '@/http/hvisualization'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const Index = (props, ref) => {

  const [form] = Form.useForm();
  const [data, setData] = useState({})

  useEffect(() => {
    if(props.data) {
      setData(cloneDeep(props.data))
      console.log('-----cloneDeep(props.data)------', cloneDeep(props.data))
      form.setFieldsValue(cloneDeep(props.data))
    } else {
      const typeMapping = {
        'pc': '0',
        'popup': '1',
        'wap': '3',
      }
      form.setFieldsValue({
        type: typeMapping[props.type]
      })
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.validateFields().then((value) => {
      let reqUrl = addPage
      if(data.id) {
        reqUrl = editPage
        value.id = data.id
      }
      reqUrl(value).then((result) => {
          if(result.error_code === 0) {
            message.success('操作成功')
            props.editFinish();
          }
      })
    })
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  return (
    <Modal
      maskClosable={false}
      getContainer={false}
      title={(data.id?'编辑':'新增') + '页面'}
      visible={true}
      cancelText='取消'
      okText='确定'
      onOk={handleOk}
      onCancel={handleCancel}
      width='600px'
    >
      <Form
        {...layout}
        requiredMark={false}
        initialValues={{}}
        form={form}
      >
      <Form.Item
        label="页面名称"
        name='name'
        rules={[{ required: true, message: '请输入页面名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="页面标识"
        name='identifer'
        rules={[{ required: true, message: '请输入页面标识' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="页面类型"
        name='type'
        rules={[{ required: true, message: '请选择页面类型' }]}
      >
        <Radio.Group disabled={!!data.id}>
          <Radio value="0">PC端</Radio>
          <Radio value="3">移动端</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="页面描述"
        name='desc'
        rules={[{ required: true, message: '请输入页面描述' }]}
      >
        <Input />
      </Form.Item>
      </Form>
    </Modal>
  )
}

export default Index