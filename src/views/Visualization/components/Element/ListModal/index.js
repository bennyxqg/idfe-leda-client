import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message, List, Select } from 'antd';
import {elementData} from '@/views/Visualization/data/elementData'
import ImageForm from '@/views/Visualization/components/Element/FormList/Image/index'
import TextForm from '@/views/Visualization/components/Element/FormList/Text/index'
import BMapForm from '@/views/Visualization/components/Element/FormList/BMap/index'
import VisContext from "@/views/Visualization/context/VisContext";
import {getItemByKey, formPromise} from '@/utils/helper'
import lodash from 'lodash'
import {randomCode} from '@/utils/helper';
import FontStyleForm from '@/views/Visualization/components/Common/FontStyleForm/index'
import EventForm from '@/views/Visualization/components/Common/EventForm/index'

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const Index = (props) => {
  const { pageData, chooseSection, setChooseSection } = useContext(VisContext)

  const [modalVisible] = useState(true)
  const [elementList, setElementList] = useState(Object.keys(elementData()).map(key => {
    return (elementData())[key]
  }))
  const [elementType, setElementType] = useState('')
  const [elementItem, setElementItem] = useState(null)

  const formRef = useRef();
  const fontFormRef = useRef();
  const eventFormRef = useRef();

  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data) {
      if(props.type === 'edit') { // 编辑
        setElementItem(props.data)
        setElementType(props.data.type)
      } else { // 新增
        form.setFieldsValue({
          text: props.data.data.text
        })
      }
    }
  }, []);

  const handleOk = (value) => {
    if(props.type === 'edit') {
      validForm()
    } else {
      formPromise(form).then(() => {
        validForm()
      })
    }

    // form.validateFields().then((value) => {
    //   formRef.current.ref.validateFields().then((positionVal) => {
    //     if(fontFormRef.current && fontFormRef.current.ref) {
    //       fontFormRef.current.ref.validateFields().then((fontVal) => {
    //         updateSection(value, positionVal, fontVal)
    //       })
    //     } else {
    //       updateSection(value, positionVal)
    //     }
    //   })
    // })

    // props.modalChange(false);
    // form.submit()
  }

  const validForm = async () => {
    const valueData = {}
    if(formRef && formRef.current && formRef.current.ref) {
      const commonVal = await formPromise(formRef.current.ref)
      valueData.common = commonVal
    }
    if(fontFormRef && fontFormRef.current && fontFormRef.current.ref) {
      const fontVal = await formPromise(fontFormRef.current.ref)
      valueData.font = fontVal
    }
    if(eventFormRef && eventFormRef.current && eventFormRef.current.ref) {
      const eventVal = await formPromise(eventFormRef.current.ref)
      if(eventVal.type == 2) { // 内页
        if(eventVal.sitePageId) {
          const eventItem = getItemByKey(pageData, 'id', eventVal.sitePageId)
          if(eventItem) {
            eventVal.sitePage = eventItem
            delete eventVal.sitePageId
          }
        }
      }
      valueData.event = eventVal

    }
    updateSection(valueData)
  }

  const updateSection = (valueData) => {
    message.success('操作成功');
    if(props.type === 'edit') { // 编辑
      let sendData = {}
      if(valueData.common) {
        lodash.assign(sendData, valueData.common)
      }
      
      if(sendData.style && valueData.font) {
        lodash.assign(sendData.style, {
          font: valueData.font
        })
      }
      if(valueData.event) {
        lodash.assign(sendData, {
          event: valueData.event
        })
      }
      console.log('-----sendData--22---', sendData)
      props.onFinish(sendData)
    } else { // 新增
      lodash.assign(elementItem.data, valueData.common)
      if(valueData.font) {
        lodash.assign(elementItem.data.style, {
          font: valueData.font
        })
      }
      if(valueData.event) {
        lodash.assign(elementItem.data, {
          event: valueData.event
        })
      }
      // setChooseSection(update(chooseSection, {$merge: {
      //   data: childVal
      // }}))
      // const chooseSectionTemp = lodash.cloneDeep(chooseSection)
      elementItem.elementId = `element_${randomCode(8)}`
      if(chooseSection.data.elements && chooseSection.data.elements.length) {
        chooseSection.data.elements.push(elementItem)
      } else {
        chooseSection.data.elements = [elementItem]
      }
      props.modalChange(false)
    }
    
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  // 改变选择的元素
  const changeType = type => {
    setElementType(type)
    const item = getItemByKey(elementList, 'type', type)
    setElementItem(lodash.cloneDeep(item))
  }

  return <Modal
    title={props.type !== 'edit'?'添加元素':'编辑元素'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
    maskClosable={false}
  >
    <div className="vis-add-modal-element-list"> 
      {
        props.type !== 'edit' && (
          <Form
            {...layout}
            requiredMark={false}
            initialValues={{}}
            form={form}
          >
            <Form.Item
              rules={[{ required: true, message: '请选择元素' }]}
              name='elementType' label="选择元素:">
              <Select onChange={changeType}>
                {
                  elementList.map((item, index) => {
                    return <Option key={item.type} value={item.type}>{item.label}</Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        )
      }
      
      {
        elementItem && (
          <div>
            {
              elementType && elementType==='imageElement' &&
              (
                <>
                  <ImageForm 
                    data={elementItem.data}
                    ref={formRef} />
                  <EventForm 
                    data={elementItem.data.event}
                    ref={eventFormRef}
                  />
                </>
              )
            }
            {
              elementType && elementType==='textElement' &&
              (
                <>
                  <TextForm 
                    data={elementItem.data}
                    ref={formRef} />
                  {
                    elementItem.data.style &&
                    <FontStyleForm 
                      data={elementItem.data.style.font}
                      ref={fontFormRef}
                    />
                  }
                </>
              )
            }
            {
              elementType && elementType==='bMapElement' &&
              (
                <>
                  <BMapForm 
                    data={elementItem.data}
                    ref={formRef} />
                </>
              )
            }
          </div>
        )
      }
    </div>
  </Modal>

}

export default Index