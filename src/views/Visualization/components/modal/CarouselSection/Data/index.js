import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message } from 'antd';
import ImgGroupSelector from '@/components/ImgGroupSelector/index'
import lodash from 'lodash'
import VisContext from "@/views/Visualization/VisContext";

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
    const chooseSectionTemp = lodash.cloneDeep(chooseSection)
    if(Img.current && Img.current.dataToParent) {
      const {groupId, list} = Img.current.dataToParent()
      // chooseSectionTemp.data.imgs = imgData
      chooseSectionTemp.data.imgs.groupId = groupId
      chooseSectionTemp.data.imgs.list = list
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
        imgData={props.data.imgs}
      />
    </div>
  </Modal>

}

export default EditModal