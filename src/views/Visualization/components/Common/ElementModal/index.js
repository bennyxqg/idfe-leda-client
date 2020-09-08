import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const Index = (props) => {
  const [modalVisible] = useState(true)

  const formRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data) {
      form.setFieldsValue({
        text: props.data.data.text
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
    props.onFinish(sendData);
  };

  return <Modal
    title={'添加元素'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
  >
    <div >

    </div>
  </Modal>

}

export default Index