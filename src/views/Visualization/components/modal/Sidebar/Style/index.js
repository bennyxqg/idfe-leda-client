import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Input, message, InputNumber, Radio } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import { cloneDeep } from 'lodash'
import WidthInputField from '@/views/Visualization/components/Common/fileds/WidthInputField'
import BgStyleForm from '@/views/Visualization/components/Common/BgStyleForm/index_whole'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

const EditModal = (props) => {
  const [modalVisible] = useState(true)
  const [styleData, setStyleData] = useState({})

  const [form] = Form.useForm();

  useEffect(() => {
    if (props.data) {
      setStyleData(cloneDeep(props.data.data.style))
      form.setFieldsValue({
        ...props.data.data.style
      })
      // form.setFieldsValue({
      //   width: '100px'
      // })
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = (value) => {
    if (props.modalChange) {
      props.modalChange(false);
    }
  }

  const onFinish = values => {
    message.success('操作成功');
    const sendData = values
    const dataObj = cloneDeep(props.data.data)
    dataObj.style = Object.assign({}, styleData, sendData)
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
    <div>
      <Form
        {...layout}
        requiredMark={false}
        initialValues={{}}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="宽度"
          name="width"
        >
          <WidthInputField />
        </Form.Item>
        <Form.Item
          label="高度"
          name="height"
        >
          <WidthInputField />
        </Form.Item>
        <Form.Item
          label="距离顶部距离"
          name="offsetTop"
        >
          <WidthInputField />
        </Form.Item>
        <BgStyleForm noWrapper={true}
          hideVideo={true}
          defaultType={styleData.bg && styleData.bg.bgType} />
      </Form>
    </div>
  </Modal>

}

export default EditModal