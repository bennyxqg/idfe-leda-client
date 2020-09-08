import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Select, Radio } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'
import BgStyleForm from '@/views/Visualization/components/Common/BgStyleForm/index'


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
    title={'编辑样式'}
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
        label="背景类型"
        name="linkType"
        rules={[{ required: true, message: '请选择背景类型' }]}
      >
        <Radio.Group>
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
      <Form.Item
        label="背景颜色"
        name="bgColor"
      >
        <Input type='color' />
      </Form.Item>
      <Form.Item
          label="背景图片"
          name="bgImg"
        >
          <ImgUpload></ImgUpload>
      </Form.Item>
    </Form>
    </div>
  </Modal>

}

export default EditModal