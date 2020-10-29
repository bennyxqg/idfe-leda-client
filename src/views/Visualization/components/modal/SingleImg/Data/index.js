import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message } from 'antd';
import ImgUpload from '@/components/ImgUpload'
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
        ...props.data.data
      })
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
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
    dataObj.url = sendData.url
    props.onFinish(dataObj);
  };

  return <Modal
    getContainer={false}
    title={'编辑图片'}
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
      requiredMark={false}
      initialValues={{}}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
          label="上传图片"
          name="url"
          rules={[{ required: true, message: '请上传图片' }]}
        >
          <ImgUpload></ImgUpload>
      </Form.Item>
    </Form>
    </div>
  </Modal>

}

export default EditModal