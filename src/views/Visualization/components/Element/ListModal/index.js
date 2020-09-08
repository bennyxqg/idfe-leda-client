import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message, List, Select } from 'antd';
import {elementData} from '@/views/Visualization/elementData'
import ImageForm from '@/views/Visualization/components/Element/FormList/Image/index'
import TextForm from '@/views/Visualization/components/Element/FormList/Text/index'
import VisContext from "@/views/Visualization/VisContext";
import {getItemByKey} from '@/utils/helper'
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
  const { chooseSection, setChooseSection } = useContext(VisContext)

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
      form.setFieldsValue({
        text: props.data.data.text
      })
    }
  }, []);

  // promise函数
  const formPromise = (targetRef) => {
    return new Promise((resolve, reject) => {
      if(!targetRef.validateFields) {
        reject()
        return
      }
      targetRef.validateFields().then((value) => {
        resolve(value)
      }).catch(() => {
        reject()
      })
    })
  }

  const handleOk = (value) => {
    console.log('--------', formRef.current.ref)
    formPromise(form).then(async () => {
      const valueData = {}
      const commonVal = await formPromise(formRef.current.ref)
      valueData.common = commonVal
      if(fontFormRef.current && fontFormRef.current.ref) {
        const fontVal = await formPromise(fontFormRef.current.ref)
        valueData.font = fontVal
      }
      if(eventFormRef.current && eventFormRef.current.ref) {
        const eventVal = await formPromise(eventFormRef.current.ref)
        valueData.event = eventVal
      }
      updateSection(valueData)
    })

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

  const updateSection = (valueData) => {
    message.success('操作成功');
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
    title={'添加元素'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
  >
    <div className="vis-add-modal-element-list"> 
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
          </div>
        )
      }
    </div>
  </Modal>

}

export default Index