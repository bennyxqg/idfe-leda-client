import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message } from 'antd';
import {cloneDeep} from 'lodash'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const EditModal = (props) => {
  const [modalVisible] = useState(true)

  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data) {
      form.setFieldsValue({
        name: props.data.data.name
      })
    }
  }, []);

  const handleOk = (value) => {
    form.submit()
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  const onFinish = values => {
    message.success('操作成功');
    const sendData = values
    const dataObj = cloneDeep(props.data.data)
    console.log('---sendData.name----', sendData.name)
    dataObj.name = sendData.name || ''
    props.onFinish(dataObj);
  };

  return <Modal
    maskClosable={false}
    title={'编辑模块'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
  >
    <div >
      <Form
        {...layout}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="模块名称"
          name="name"
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  </Modal>

}

export default EditModal