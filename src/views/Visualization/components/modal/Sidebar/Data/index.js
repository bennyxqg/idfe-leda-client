import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const EditModal = (props) => {
  const [modalVisible] = useState(true)

  const [form] = Form.useForm();

  useEffect(() => {
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
    handleCancel()
  };

  return <Modal
    getContainer={false}
    title={'编辑数据'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
  >
    <div >
      暂无配置数据
    </div>
  </Modal>

}

export default EditModal