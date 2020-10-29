import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Form, Input, message, Radio, Transfer } from 'antd';
import { addUser, editUser } from '@/http/huser'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

// const mockData = [];
// for (let i = 0; i < 20; i++) {
//   mockData.push({
//     key: i.toString(),
//     title: `content${i + 1}`,
//     description: `description of content${i + 1}`
//   });
// }

// const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const EditModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true)
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [allSiteList, setAllSiteList] = useState([])

  const [form] = Form.useForm();

  useEffect(() => {
    setSiteList()
    if(props.editForm && props.editForm.id) {
      getTargetKeys()
      form.setFieldsValue(props.editForm)
    } else {
      form.setFieldsValue({
        status: '1'
      })
    }
  }, []);

  const setSiteList = () => {
    if(props.allSiteList && props.allSiteList.length) {
      let list = []
      list = props.allSiteList.map((site) => {
        return {
          key: site.id,
          title: site.name,
          description: site.domain_name
        }
      })
      setAllSiteList(list)
    }
  }

  const getTargetKeys = () => {
    if(props.editForm.website_id) {
      const siteIdList = props.editForm.website_id.split(',')
      setTargetKeys(siteIdList)
    }
  }

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = () => {
    setModalVisible(false)
    setTimeout(() => {
      props.modalChange(false);
    }, 500);
  }

  const onFinish = values => {
    const sendData = values
    let reqFunc = addUser
    if(targetKeys && targetKeys.length) {
      sendData.website_id = targetKeys.join(',')
    } else {
      message.error('请选择站点');
      return
    }
    if(props.editForm) {
      reqFunc = editUser
      sendData.id = props.editForm.id
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

  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys)
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  const handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };


  return <Modal
    title={(props.editForm? '编辑': '新建') + '用户'}
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
      form={form}
    >
      <Form.Item
        label="用户名"
        name="name"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={(props.editForm? '重置': '用户') + '密码'}
        name="password"
        rules={[{ required: props.editForm?false:true, message: '请输入用户密码' }]}
      >
        <Input.Password autoComplete="new-password" />
      </Form.Item>
      {/* <Form.Item
          label="用户邮箱"
          name="mail"
          rules={[{ required: true, message: '请上传视频截图' }]}
        >
          <Input />
      </Form.Item> */}
      <Form.Item label="账号状态" name="status">
        <Radio.Group>
          <Radio value="1">启用</Radio>
          <Radio value="0">停用</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
    <div>
      <Transfer
        style={{marginLeft: '67px'}}
        dataSource={allSiteList}
        listStyle={{
          width: 200,
          height: 280,
        }}
        showSearch
        operations={['加入右侧', '加入左侧']}
        titles={['所有站点', '管理站点']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onScroll={handleScroll}
        render={item => item.title}
      />
    </div>
    </div>
  </Modal>
}

export default EditModal