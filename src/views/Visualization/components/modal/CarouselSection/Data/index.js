import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message } from 'antd';
import ImgGroupSelector from '@/components/ImgGroupSelector/index'
import {cloneDeep} from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";
import ElementModal from '@/views/Visualization/components/Element/ListModal/index'
import {getItemIndexByKey} from '@/utils/helper'

const EditModal = (props) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

  const [modalVisible] = useState(true)

  const Img = useRef();

  useEffect(() => {
    if(props.data) {
    }
  }, []);

  const handleOk = (value) => {
    // // 把数据更新至全局数据中
    let isChange = false
    const chooseSectionTemp = cloneDeep(chooseSection)
    if(Img.current && Img.current.dataToParent) {
      const {groupId, list} = Img.current.dataToParent()
      // chooseSectionTemp.data.imgs = imgData
      chooseSectionTemp.data.imgs.groupId = groupId
      chooseSectionTemp.data.imgs.list = list

      // 处理轮播图上的元素
      if(props.data.data.imgs.list && props.data.data.imgs.list.length) {
        if(props.data.data.imgs.groupId != groupId) {
          chooseSectionTemp.data.imgs.elements = {}
        } else {
          const oldElements = cloneDeep(chooseSectionTemp.data.imgs.elements)
          list.forEach((item, index) => {
            const oldIndex = getItemIndexByKey(props.data.data.imgs.list, 'url', item.url)
            if(oldIndex === -1) {
              chooseSectionTemp.data.imgs.elements[`index_${index}`] = []
            } else {
              if(oldElements[`index_${oldIndex}`]) {
                chooseSectionTemp.data.imgs.elements[`index_${index}`] = oldElements[`index_${oldIndex}`]
              } else {
                chooseSectionTemp.data.imgs.elements[`index_${index}`] = []
              }
            }
          })
        }
      }
      
      isChange = true
    }
    if(isChange) {
      setChooseSection(chooseSectionTemp)
    }
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  return <Modal
    maskClosable={false}
    title={'编辑轮播图数据'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='1000px'
  >
    <div >
      <ImgGroupSelector 
        ref={Img}
        imgData={props.data.data.imgs}
      />
    </div>
  </Modal>

}

export default EditModal