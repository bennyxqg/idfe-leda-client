import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message } from 'antd';
import { addVideo, editVideo } from '@/http/hvideo'
import ImgUpload from '@/components/ImgUpload'
const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true)

  const [form] = Form.useForm();

  useEffect(() => {
    if(props.editForm && props.editForm.id) {
      form.setFieldsValue(props.editForm)
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = () => {
    setModalVisible(false)
    setTimeout(() => {
      props.modalChange(false);
    }, 500);
  }

  const onFinish = values => {
    const sendData = values
    let reqFunc = addVideo
    if(props.editForm) {
      reqFunc = editVideo
      sendData.id = props.editForm.id
    }
    reqFunc(sendData).then((rep) => {
      if(rep.error_code === 0) {
        message.success('操作成功');
        props.successCB();
      } else {
        message.error('操作失败');
      }
    })
  };

  return <Modal
    title={(props.editForm? '编辑': '新建') + '视频'}
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
      name="basic"
      initialValues={{}}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        label="视频标题"
        name="name"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="视频链接"
        name="url"
        rules={[{ required: true, message: '请输入链接' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          label="上传视频截图"
          name="cover"
          rules={[{ required: true, message: '请上传视频截图' }]}
        >
          <ImgUpload />
        </Form.Item>
      <Form.Item
        label="描述"
        name="desc"
      >
        <TextArea rows={4} />
      </Form.Item>
    </Form>
    </div>
  </Modal>

}

export default EditModal