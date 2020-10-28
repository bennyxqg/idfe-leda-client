import React, {useState, useEffect, useRef} from "react";
import { Modal, Switch, Form, Input, message, Select } from 'antd';
import {cloneDeep, merge} from 'lodash'
import { newsAll } from '@/http/hnews'

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const EditModal = (props) => {
  const [modalVisible] = useState(true)
  const [usePathParam, setUsePathParam] = useState(true)
  const [allNewsList, setAllNewsList] = useState([])

  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      if(props.data) {
        await getAllList()
        form.setFieldsValue(props.data.data)
        console.log('-----bindPathParam-------', props.data.data.bindPathParam)
        setUsePathParam(props.data.data.bindPathParam)
      }
    }
    init()
  }, []);

  const handleOk = (value) => {
    form.submit()
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  const onFinish = values => {
    message.success('操作成功');
    const sendData = values
    let dataObj = cloneDeep(props.data.data)
    dataObj = merge(dataObj, sendData)
    console.log('---dataObj---', dataObj)
    props.onFinish(dataObj);
  };

  // 获取全部数据
	const getAllList = () => {
		return newsAll().then((rep) => {
			if(rep.error_code === 0) {
				if(rep.data && rep.data.length) {
          setAllNewsList(rep.data)
				}
			}
		})
  }
  
  // 更变绑定
  const changeBind = (val) => {
    console.log('----changeBind-----', val)
    setUsePathParam(val)
  }


  return <Modal
    maskClosable={false}
    title={'编辑模块'}
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
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="模块名称"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          label="绑定链接参数"
          name="bindPathParam"
        >
          <Switch onChange={(val) => {changeBind(val)}} />
        </Form.Item>
        {/* {
            usePathParam && (

          <Form.Item
            label="链接参数"
            name="pathParam"
          >
            <Input />
          </Form.Item>
          )
        } */}
        {
          !usePathParam && (
            <Form.Item
              label="固定数据"
              name="newsId"
            >
              <Select
                  showSearch
                  allowClear={true}
                  style={{ width: 360 }}
                  placeholder="搜索新闻标题"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    {
                      if(option.children) {
                        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        
                      }
                      return false
                    }
                  }
                >
                  {
                    allNewsList.map(item => (
                      <Option key={item.id} value={item.id} title={item.title}>
                        {item.title}
                      </Option>
                    ))
                  }
                </Select>
            </Form.Item>
          )
        }
        
      </Form>
    </div>
  </Modal>

}

export default EditModal