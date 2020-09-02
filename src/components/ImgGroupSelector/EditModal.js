import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message, Select } from 'antd';
import { addPic, editPic } from '@/http/hcarousel'
import ImgUpload from '@/components/ImgUpload'
import VisContext from "@/views/Visualization/VisContext";
import lodash from 'lodash'
const { TextArea } = Input;
const { Option } = Select;


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const EditModal = (props) => {
  const { allPic, setAllPic } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)

  const formRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    if(props.editForm) {
      const editForm = lodash.cloneDeep(props.editForm)
      editForm.group_ids = editForm.groups
      form.setFieldsValue(editForm)
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = (value) => {
    props.modalChange(false);
  }

  const onFinish = values => {
    const sendData = values
    let reqFunc = addPic
    if(props.editForm) {
      reqFunc = editPic
      sendData.id = props.editForm.id
    }
    if(sendData.group_ids) {
      sendData.group_id = sendData.group_ids.join(',')
    }
    reqFunc(sendData).then((rep) => {
      if(rep.error_code === 0) {
        message.success('操作成功');
        props.successCB();
      } else {
        message.error('操作失败');
      }
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  return <Modal
    title={(props.editForm? '编辑': '新建') + '轮播图'}
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
      name="basic"
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      ref={formRef}
      form={form}
    >
      <Form.Item
        label="标题"
        name="name"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="链接"
        name="jump_url"
        rules={[{ required: true, message: '请输入链接' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          label="上传图片"
          name="url"
          rules={[{ required: true, message: '请上传图片' }]}
        >
          <ImgUpload></ImgUpload>
        </Form.Item>
        <Form.Item
        label="所属分组"
        name="group_ids"
        rules={[{ required: true, message: '请输入链接' }]}
      >
        <Select
          placeholder="请选择分组"
          mode="multiple"
          allowClear
        >
          {
            allPic.map(item => {
              return <Option key={item.id} value={item.id}>{item.name}</Option>
            })
          }
        </Select>
      </Form.Item>
      <Form.Item
        label="描述"
        name="desc"
      >
        <TextArea rows={4} />
      </Form.Item>
    </Form>
    </div>
  </Modal>

}

export default EditModal