import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Checkbox, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'
import BgStyleForm from '@/views/Visualization/components/Common/BgStyleForm/index_whole'
import VisContext from "@/views/Visualization/VisContext";

const { Panel } = Collapse;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


const Index = (props) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

  const [modalVisible] = useState(true)

  const formRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data) {
      console.log('---props.data.data.style-------', props.data.data.style)
      form.setFieldsValue({
        ...props.data.data.style
      })
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.validateFields().then((value) => {
      formRef.current.ref.validateFields().then((childVal) => {
        message.success('操作成功');
        console.log('----validateFields------', value, childVal)
        // props.modalChange(false)
        const dataObj = lodash.cloneDeep(props.data.data)
        
        Object.assign(dataObj.style, value)
        Object.assign(dataObj.style.bg, childVal)
        console.log('-----dataObj-----', dataObj)

        props.onFinish(dataObj);
      })
    })
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
    
      <Collapse defaultActiveKey={['1']}>
        <Panel header="背景设置" key="1">
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
            onFinish={onFinish}
            form={form}
          >
            <Row className='pad-l-4'>
              {/* <Col span={8}>
                <Form.Item
                  labelCol={{span: 8}}
                  wrapperCol={{span: 10}}
                  name='width' label="宽度:">
                  <InputNumber />
                </Form.Item>
              </Col> */}
              <Col span={8}>
                <Form.Item
                  rules={[{ required: true, message: '请输入高度' }]}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 10}}
                  name='height' label="高度:">
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
    
    </div>
  </Modal>

}

export default Index