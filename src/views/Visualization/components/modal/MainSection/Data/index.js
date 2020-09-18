import React, {useState, useEffect, useRef, useCallback, useContext} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Radio, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ImgUpload from '@/components/ImgUpload'
import { randomCode, addOrEditForListItem, getItemByKey } from '@/utils/helper'
import lodash from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const Index = (props) => {
  const { sectionList, setSectionList } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)
  const [eventData, setEventData] = useState(null)

  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data && props.data.data) {
      const eventTemp = lodash.cloneDeep(props.data.data.btn.event)
      setEventData(eventTemp)
      form.setFieldsValue(eventTemp)
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
    const dataObj = lodash.cloneDeep(props.data.data)
    dataObj.btn.event = lodash.assign(dataObj.btn.event, sendData) 
    props.onFinish(dataObj);
  };

  const changeType = (e) => {
    console.log('----changeType--', e.target.value)
    setEventData({
      ...eventData,
      ...{type: e.target.value }
    })
  }


  return <Modal
    getContainer={false}
    title={'首屏设置'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
    maskClosable={false}
  >
    {
      eventData && <div>
        <Form
          {...layout}
          requiredMark={false}
          initialValues={{}}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="type" label="交互类型:">
            <Radio.Group onChange={(e) => {changeType(e)}}>
              <Radio value={4}>弹窗</Radio>
              <Radio value={1}>外链</Radio>
              <Radio value={2}>内页</Radio>
              <Radio value={3}>锚点</Radio>
            </Radio.Group>
          </Form.Item>
          {
            eventData.type == 1 && (
              <>
                <Form.Item
                  label="外链地址"
                  name="linkUrl"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                    label="打开方式"
                    name="linkUrlType"
                  >
                  <Radio.Group>
                    <Radio value={1}>原窗口</Radio>
                    <Radio value={2}>新窗口</Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            )
          }
          {
            eventData.type == 2 && (
            <Form.Item
              label="选择内页"
              name="sitePageId"
            >
              <Input />
            </Form.Item>
          )}
          {
            eventData.type == 3 && (
            <Form.Item
              label="选择模块"
              name="sectionId"
            >
              <Input />
            </Form.Item>
          )}
          {
            eventData.type == 4 && (
            <Form.Item
              label="选择弹窗"
              name="popupId"
            >
              <Input />
            </Form.Item>
          )}
        </Form>
        </div>
    }
    
  </Modal>

}

export default Index