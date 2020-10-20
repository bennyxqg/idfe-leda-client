import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Switch, Button, Form, Input, message, Modal, Select, Radio } from 'antd';
import {cloneDeep} from 'lodash'
import {addGuidePage, editGuidePage} from '@/http/hvisualization'

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
      form.setFieldsValue(cloneDeep(props.data))
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.validateFields().then((value) => {
      let reqUrl = addGuidePage
      if(data.id) {
        reqUrl = editGuidePage
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
      title={(data.id?'编辑':'新增') + '落地页'}
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
        label="落地页名称"
        name='name'
        rules={[{ required: true, message: '请输入落地页名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="描述"
        name='desc'
        rules={[{ required: true, message: '请输入描述' }]}
      >
        <Input />
      </Form.Item>
      </Form>
    </Modal>
  )
}

export default Index