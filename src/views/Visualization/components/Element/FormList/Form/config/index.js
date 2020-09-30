import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import {cloneDeep} from 'lodash'
import ItemConfigModal from './ItemConfigModal'

const { TextArea } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const Index = React.forwardRef((props, ref) => {

  const [showItemConfigModal, setShowItemConfigModal] = useState(false)
  
  const [form] = Form.useForm();
  

  useImperativeHandle(ref, () => ({
    ref: ref.current
  }));

  useEffect(() => {
    console.log('4566---', props.data)
    if(props.data) {
      const dataTemp = cloneDeep(props.data)
    
      form.setFieldsValue(dataTemp)
    }
  }, []);

  const handleShowItemConfigModal = () => {
  }

  const modalChange = () => {
    props.modalChange(false)
  }

  return <div >
    <ItemConfigModal 
      data={props.data.data.itemConfig}
      elementId={props.data.elementId}
      sectionId={props.sectionId}
      modalChange={modalChange}
    />
  </div>
})

export default Index