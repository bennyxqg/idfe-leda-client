import React, {useState, useEffect, useRef} from "react";
import { Modal, Table, Button, Form, Input, message } from 'antd';
import { addGroup, editGroup } from '@/http/hcarousel'


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const EditModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true)

  const formRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    if(props.editForm && props.editForm.id) {
      form.setFieldsValue({
        name: props.editForm.name,
        identifer: props.editForm.identifer
      })
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = (value) => {
    props.modalChange(false);
  }

  const onFinish = values => {
    const sendData = values
    sendData.status = 1
    let reqFunc = addGroup
    if(props.editForm) {
      reqFunc = editGroup
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

  const onFinishFailed = errorInfo => {
  };

  return <Modal
    title={(props.editForm? '编辑': '新建') + '分组'}
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
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      ref={formRef}
      form={form}
    >
      <Form.Item
        label="分组名称"
        name="name"
        rules={[{ required: true, message: '请输入分组名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="分组标识"
        name="identifer"
        rules={[{ required: true, message: '请输入分组标识' }]}
      >
        <Input />
      </Form.Item>
    </Form>
    </div>
  </Modal>

}

// .iframe {
//   width: 100%;
//   border: none;
//   height: 700px;
//   &::-webkit-scrollbar {
//       width: 5px;
//       height: 5px;
//   }
//   &::-webkit-scrollbar-thumb {
//       border-radius: 2.5px;
//       background-color: #a4c9f5;
//   }
//   &::-webkit-scrollbar-track {
//       border-radius: 2.5px;
//       background-color: #e6e6e6;
//   }
// }

export default EditModal