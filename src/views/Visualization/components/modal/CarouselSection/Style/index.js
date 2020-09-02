import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message, InputNumber } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'

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
        ...props.data.data.style
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
    const dataObj = lodash.cloneDeep(props.data.data)
    dataObj.style = sendData
    props.onFinish(dataObj);
  };

  return <Modal
    getContainer={false}
    title={'编辑轮播图样式'}
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
        label="上内边距"
      >
        <Form.Item
          noStyle
          name="paddingTop"
          rules={[{ required: true, message: '请输入上内边距' }]}
        >
          <InputNumber />
        </Form.Item>
        <span className='mar-l-4'>px</span>
      </Form.Item>
      <Form.Item
        label="下内边距"
      >
        <Form.Item
          noStyle
          name="paddingBottom"
          rules={[{ required: true, message: '请输入下内边距' }]}
        >
          <InputNumber />
        </Form.Item>
        <span className='mar-l-4'>px</span>
      </Form.Item>
      <Form.Item
          label="上传图片"
          name="bgImg"
          rules={[{ required: true, message: '请上传背景图片' }]}
        >
          <ImgUpload></ImgUpload>
      </Form.Item>
    </Form>
    </div>
  </Modal>

}

export default EditModal