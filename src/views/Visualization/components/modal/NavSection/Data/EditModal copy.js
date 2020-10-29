import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message, Select, Radio } from 'antd';
import VisContext from "@/views/Visualization/context/VisContext";

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}
const EditModal = (props) => {
  const { sectionList, setSectionList } = useContext(VisContext)
  const [modalVisible, setModalVisible] = useState(true)
  const [sections, setSections] = useState([])

  const formRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    handleSections()
    if(props.editForm && props.editForm.Uid) {
      form.setFieldsValue(props.editForm)
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

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = (value) => {
    props.modalChange(false);
  }

  const onFinish = values => {
    const sendData = values
    console.log('------onFinish-----', sendData)
    if(props.editForm && props.editForm.Uid) {
      sendData.Uid = props.editForm.Uid
    }
    props.successCB(sendData);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChangeType = (e) => {
    console.log('-----onChangeType----', e)
  }


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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      ref={formRef}
      form={form}
    >
      <Form.Item
        label="名称"
        name="label"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="打开方式"
        name="linkType"
        rules={[{ required: true, message: '请选择打开方式' }]}
      >
        <Select>
          <Select.Option value={'1'}>锚点</Select.Option>
          <Select.Option value={'2'}>当前窗口打开</Select.Option>
          <Select.Option value={'3'}>新窗口打开</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="页面地址"
        name="url"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="跳转模块"
        name="sectionId"
      >
        <Select>
          {
            sections.map((item) => {
              return (
                <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
              )
            })
          }
        </Select>
      </Form.Item>
    </Form>
    </div>
  </Modal>

}

export default EditModal