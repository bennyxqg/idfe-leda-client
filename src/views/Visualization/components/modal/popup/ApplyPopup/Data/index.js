import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Checkbox, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'

const { Panel } = Collapse;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


const EditModal = (props) => {
  const [modalVisible] = useState(true)

  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data) {
      console.log('---props.data.data.style-------', props.data.data.style)
      form.setFieldsValue({
        platForm: props.data.data.platForm
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
    console.log('--sendData----666---', sendData)
    const dataObj = lodash.cloneDeep(props.data.data)
    dataObj.platForm = sendData.platForm
    props.onFinish(dataObj);
  };

  return <Modal
    getContainer={false}
    title={'配置数据'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
    maskClosable={false}
  >
    <div className='text-c'>
      暂无配置项
    </div>
  </Modal>

}

export default EditModal