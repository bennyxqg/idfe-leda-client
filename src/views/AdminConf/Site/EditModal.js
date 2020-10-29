import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message, Radio } from 'antd';
import { addSite, editSite } from '@/http/hsite'
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
    } else {
      form.setFieldsValue({
        status: '1'
      })
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
    let reqFunc = addSite
    if(props.editForm) {
      reqFunc = editSite
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
    title={(props.editForm? '编辑': '新建') + '站点'}
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
        label="网站名称"
        name="name"
        rules={[{ required: true, message: '请输入网站名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="网站域名"
        name="domain_name"
        rules={[{ required: true, message: '请输入网站域名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          label="网站目录"
          name="directory_name"
          rules={[{ required: true, message: '请输入网站目录' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="网站状态" name="status">
          <Radio.Group>
            <Radio value="1">开启</Radio>
            <Radio value="0">关闭</Radio>
          </Radio.Group>
        </Form.Item>
    </Form>
    </div>
  </Modal>

}

export default EditModal