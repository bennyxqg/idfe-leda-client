import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message, Select, Radio } from 'antd';
import VisContext from "@/views/Visualization/context/VisContext";
import EventForm from '@/views/Visualization/components/Common/EventForm/index'
import lodash from 'lodash'
import {getItemByKey, formPromise} from '@/utils/helper'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const EditModal = (props) => {
  const { pageData, sectionList, setSectionList } = useContext(VisContext)
  const [modalVisible, setModalVisible] = useState(true)
  const [sections, setSections] = useState([])

  const [eventFormData, setEventFormData] = useState({
    type: 1, // 交互类型 1: 外链，2：内页 3：锚点 4：弹窗
    linkUrl: '', // 外链
    sitePage: null, // 内页
    sectionId: '', // 锚点
    popupId: '', // 弹窗
    linkUrlType: 1 // 1：本窗口打开， 2：新窗口打开
  });

  const eventFormRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    handleSections()
    if(props.editForm && props.editForm.Uid) {
      form.setFieldsValue(props.editForm)
      setEventFormData(props.editForm.event)
    }
  }, []);

  const handleSections = () => {
    const list = sectionList.map((item) => {
      // Obejct.keys(item).for
      return {
        label: item.label,
        value: item.sectionId,
        type: item.type
      }
    })
    console.log('-----handleSections------', list)
    setSections(list)
  }

  const handleOk = async (value) => {
    // props.modalChange(false);
    // form.submit()
    const commonVal = await formPromise(form)
    let sendData = commonVal
    
    if(eventFormRef.current && eventFormRef.current.ref) {
      const eventVal = await formPromise(eventFormRef.current.ref)
      console.log('----eventVal-----', eventVal)
      if(eventVal.type == 2) { // 内页
        if(eventVal.sitePageId) {
          const eventItem = getItemByKey(pageData, 'id', eventVal.sitePageId)
          if(eventItem) {
            eventVal.sitePage = eventItem
            delete eventVal.sitePageId
          }
        }
      }
      sendData = lodash.assign(sendData, {
        event: eventVal
      })
    }
    
    if(props.editForm && props.editForm.Uid) {
      sendData.Uid = props.editForm.Uid
    }
    props.successCB(sendData);
  }

  const handleCancel = (value) => {
    props.modalChange(false);
  }

  // const onFinish = values => {
  //   let sendData = values

  //   sendData = lodash.assign(sendData, {
  //     event: eventFormData
  //   })
  //   if(props.editForm && props.editForm.Uid) {
  //     sendData.Uid = props.editForm.Uid
  //   }
  //   props.successCB(sendData);
  // };

  // const eventFormChange = (allvalues) => {
  //   console.log('-----allvalues-------', allvalues)
  //   setEventFormData(allvalues)
  // }

  return <Modal
    title={(props.editForm? '编辑': '新建') + '菜单'}
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
        initialValues={{}}
        form={form}
      >
        <Form.Item
          label="名称"
          name="label"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
    <EventForm 
        ref={eventFormRef}
        data={eventFormData}
        // onChange={(allvalues, isValid) => {
        //   eventFormChange(allvalues, isValid)
        // }}
      />
  </Modal>

}

export default EditModal