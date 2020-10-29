import React, {useState, useEffect, useContext, useImperativeHandle} from "react";
import { Modal, Form, Tabs, message,List } from 'antd';
import { cloneDeep } from "lodash";
import FormItemList from '@/views/Visualization/components/Common/FormElement/FormItemList/index.js'
import VisContext from "@/views/Visualization/context/VisContext";
import {getItemByKey} from '@/utils/helper'

const Index = ((props) => {
  const { sectionList, setSectionList } = useContext(VisContext)

  const [modalVisible] = useState(true)
  const [itemList, setItemList] = useState([])
  const [isChange, setIsChange] = useState(false)

  useEffect(() => {
    if(props.data && props.data.length) {
      setItemList(cloneDeep(props.data))
    }
  }, []);

  const handleOk = (value) => {
    props.modalChange(false)
    if(isChange) {
      updateSection()
    }
  }

  const updateSection = () => {
    const sectionListTemp = cloneDeep(sectionList)
    const targetSection = getItemByKey(sectionListTemp, 'sectionId', props.sectionId)
    const targetElement = getItemByKey(targetSection.data.elements, 'elementId', props.elementId)
    
    targetElement.data.itemConfig = itemList

    setSectionList(sectionListTemp)
  }

  const handleCancel = (value) => {
    props.modalChange(false)
  }

  // 修改控件
  const changeForm = (list) => {
    console.log('-----changeForm-----', list, props.sectionId, props.elementId)
    setItemList(list)
    setIsChange(true)
  }

  return <Modal
    title={'配置表单数据'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='660px'
  >
    <div >
      <div>
        <FormItemList 
          data={itemList}
          className='el-form-config-wrap'
          onChange={changeForm}
        />
      </div>
    </div>
  </Modal>
})

export default Index
