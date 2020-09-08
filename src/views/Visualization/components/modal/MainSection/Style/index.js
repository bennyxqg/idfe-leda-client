import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'
import BgStyleForm from '@/views/Visualization/components/Common/BgStyleForm/index'

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
      const form_data = {
        ...props.data.data.style,
        btn: {
          ...props.data.data.btn
        }
      }

      form.setFieldsValue(form_data)
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
    console.log('-----sendData------', sendData)
    const dataObj = lodash.cloneDeep(props.data.data)
    if(!sendData.width) {
      sendData.width = ''
    }
    if(!sendData.height) {
      sendData.height = ''
    }
    // dataObj.style = sendData
    // props.onFinish(dataObj);
    dataObj.style = lodash.assign(dataObj.style, sendData)
    dataObj.btn = lodash.assign(dataObj.btn, sendData.btn)
    delete dataObj.style.btn
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
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel header="背景设置" key="1">
          <BgStyleForm 
            defaultType={2}
          />
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
        </Panel>
        <Panel header="交互按钮样式" key="2">
          <Form.Item
            name={['btn', 'show']} label="是否显示:">
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={['btn', 'imgUrl', ]} label="按钮图片:">
            <ImgUpload />
          </Form.Item>
        </Panel>
      </Collapse>
    </Form>
    </div>
  </Modal>

}

export default EditModal