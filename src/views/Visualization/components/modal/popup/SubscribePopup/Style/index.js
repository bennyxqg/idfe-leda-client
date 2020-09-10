import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Checkbox, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'
import BgStyleForm from '@/views/Visualization/components/Common/BgStyleForm/index_whole'

const { Panel } = Collapse;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


const EditModal = (props) => {
  const [modalVisible] = useState(true)

  const formRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data) {
      console.log('---props.data.data.style-------', props.data.data.style)
      const styleData = {
        ...props.data.data.style,
        submitBtn: {
          imgUrl: props.data.data.submitBtn.imgUrl
        },
        successPopup: {
          imgUrl: props.data.data.successPopup.imgUrl
        },
      }
      form.setFieldsValue(styleData)
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.validateFields().then((value) => {
      formRef.current.ref.validateFields().then((childVal) => {
        message.success('操作成功');
        const dataObj = lodash.cloneDeep(props.data.data)

        Object.assign(dataObj.style.bg, childVal)
        Object.assign(dataObj.submitBtn, value.submitBtn)
        Object.assign(dataObj.successPopup, value.successPopup)
        delete value.submitBtn
        delete value.successPopup
        Object.assign(dataObj.style, value)

        props.onFinish(dataObj);
      })
    })
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

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
      {
        props.data.data.style.bg && (
          <BgStyleForm 
            ref={formRef}
            data={props.data.data.style.bg}
          />
        )
      }
      <Form
        {...layout}
        requiredMark={false}
        initialValues={{}}
        form={form}
      > 
        <Row className='pad-l-4'>
          <Col span={8}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 10}}
              name='width' label="宽度:">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 10}}
              name='height' label="高度:">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row className=''>
          <Col span={12}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 10}}
              name={['submitBtn', 'imgUrl']} label="按钮图片:">
              <ImgUpload />
            </Form.Item>
          </Col>
        </Row>
        <Row className=''>
          <Col span={12}>
            <Form.Item
              labelCol={{span: 8}}
              wrapperCol={{span: 10}}
              name={['successPopup', 'imgUrl']} label="成功图片:">
              <ImgUpload />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  </Modal>

}

export default EditModal