import React, {useState, useEffect, useRef} from "react";
import { Modal, Table, Button, Form, Input, message } from 'antd';
import lodash from 'lodash'
import { addBasicConfig } from '@/http/hwebInfo'

const CategoryInfo = (props) => {
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(true)

  const formRef = useRef();

  useEffect(() => {
    
  }, []);
  
  const handleOk = (value) => {
    formRef.current.validateFields().then((val) => {
      console.log('123213-----', val)
      addBasicConfig(val).then((rep) => {
        if(rep.error_code === 0) {
          props.modalChange(false);
          props.successCB();
          message.success('操作成功');
        } else {
          message.error(rep.msg);
        }
      })
    })
  }

  const handleCancel = (value) => {
    props.modalChange(false);
  }

  const onFinish = values => {
    console.log('Finish:', values);
    newsCateAdd(values).then((rep) => {
			if(rep.error_code === 0) {
        message.success('操作成功');
        formRef.current.setFieldsValue({
          name: ''
        })
        getTableData()
      } else {
        message.error(rep.msg);
      }
      
    })
  };

  return <Modal
    title='新增'
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <div >
      <Form form={form} 
        ref={formRef}>
        <Form.Item
          label="名称"
          name="title"
          rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item
          label="字段"
          name="Abbr"
          rules={[{ required: true, message: '请输入字段' }]}>
          <Input placeholder="请输入字段" />
        </Form.Item>
        <Form.Item
          label="配置值"
          name="content"
          rules={[{ required: true, message: '请输入配置值' }]}>
          <Input.TextArea placeholder="请输入配置值" />
        </Form.Item>
      </Form>
    </div>
    
  </Modal>
}

export default CategoryInfo