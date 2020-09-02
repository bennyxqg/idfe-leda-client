import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Radio } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'

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
    if(props.data) {
      setStyleData(lodash.cloneDeep(props.data.data.style))
      form.setFieldsValue({
        ...props.data.data.style
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
    if(sendData.widthType == 1) {
      sendData.width = 0
    }
    if(sendData.heightType == 1) {
      sendData.height = 0
    }
    const dataObj = lodash.cloneDeep(props.data.data)
    dataObj.style = Object.assign({}, styleData, sendData)
    props.onFinish(dataObj);
  };

  // 类型变化
  const onChangeSize = (e, type) => {
    if(type === 'width') {
      setStyleData(Object.assign({}, styleData, {widthType: e.target.value}))
    } else if(type === 'height') {
      setStyleData(Object.assign({}, styleData, {heightType: e.target.value}))
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
        name="widthType"
      >
        <Radio.Group onChange={(val) => {onChangeSize(val, 'width')}} >
          <Radio style={radioStyle} value={1}>
            默认
          </Radio>
          <Radio style={radioStyle} value={2}>
            固定
            {
              styleData.widthType === 2 && 
              (
                <>
                  <Form.Item
                    noStyle
                    name="width"
                    rules={[{ required: true, message: '请输入宽度' }]}
                  >
                    <InputNumber className='mar-l-8' />
                  </Form.Item>
                  <span className='mar-l-4'>px</span>
                </>
              )
            }
            
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="高度"
        name="heightType"
      >
        <Radio.Group onChange={(val) => {onChangeSize(val, 'height')}} >
          <Radio style={radioStyle} value={1}>
            自适应
          </Radio>
          <Radio style={radioStyle} value={2}>
            固定
            {
              styleData.heightType === 2 && 
              (
                <>
                  <Form.Item
                    noStyle
                    name="height"
                    rules={[{ required: true, message: '请输入高度' }]}
                  >
                    <InputNumber className='mar-l-8' />
                  </Form.Item>
                  <span className='mar-l-4'>px</span>
            </>
              )
            }
          </Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
    </div>
  </Modal>

}

export default EditModal