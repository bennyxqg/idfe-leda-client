import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message, List, Select } from 'antd';
import ImageForm from '@/views/Visualization/components/Element/FormList/Image/index'
import TextForm from '@/views/Visualization/components/Element/FormList/Text/index'
import FontStyleForm from '@/views/Visualization/components/Common/FontStyleForm/index'
import lodash from 'lodash'

const Index = (props) => {  
  const [elementItem, setElementItem] = useState(null)


  const formRef = useRef();
  const textFormRef = useRef();

  useEffect(() => {
    setElementItem(props.data)
  }, []);

  const handleOk = (value) => {
    const valueData = {}
    formRef.current.ref.validateFields().then((commonVal) => {
      valueData.common = commonVal
      if(textFormRef.current && textFormRef.current.ref) {
        textFormRef.current.ref.validateFields().then((fontVal) => {
          valueData.font = fontVal
          updateSection(valueData)
        })
      } else {
        updateSection(valueData)
      }
    })
    // props.modalChange(false);
    // form.submit()
  }

  // 更新模块
  const updateSection = (valueData) => {
    message.success('操作成功');
    let sendData = {}
    lodash.assign(sendData, valueData.common)
    lodash.assign(sendData.style, {
      font: valueData.font
    })
    props.onFinish(sendData)
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  return <Modal
    title={'编辑元素'}
    visible={true}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
  >
  <div className="vis-add-modal-element-list"> 
      {
        elementItem && (
          <div>
            {
              elementItem.type==='imageElement' &&
              (
                <>
                  <ImageForm 
                    data={elementItem.data}
                    ref={formRef} />
                </>
              )
            }
            {
              elementItem.type==='textElement' &&
              (
                <>
                  <TextForm 
                    data={elementItem.data}
                    ref={formRef} />
                  {
                    elementItem.data.style &&
                    <FontStyleForm 
                      data={elementItem.data.style.font}
                      ref={textFormRef}
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