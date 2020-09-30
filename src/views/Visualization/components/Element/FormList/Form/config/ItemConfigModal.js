import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Modal, Form, Tabs, message,List } from 'antd';
import { cloneDeep } from "lodash";
import FormItemList from '@/views/Visualization/components/Common/FormElement/FormItemList/index.js'


const Index = ((props) => {
  const [modalVisible] = useState(true)
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    if(props.data && props.data.length) {
      setItemList(cloneDeep(props.data))
    }
  }, []);

  const handleOk = (value) => {
    props.modalChange(false)
  }

  const handleCancel = (value) => {
    props.modalChange(false)
  }

  // 修改控件
  const changeForm = (list) => {
    console.log('-----changeForm-----', list)
  }

  return <Modal
    title={'配置表单数据'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
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
