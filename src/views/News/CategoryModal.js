import React, {useState, useEffect, useRef} from "react";
import { Modal, Table, Button, Form, Input, message } from 'antd';
import {cloneDeep} from 'lodash'
import { newsCateList, newsCateAdd, newsCateEdit, newsCateDel } from '@/http/hnews'

const CategoryInfo = (props) => {
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(true)
  const [dataSource, setDataSource] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const formRef = useRef();

  const getTableData = (props) => {
    newsCateList().then((rep) => {
			if(rep.error_code === 0) {
        const data = rep.data
        const tableList = []
        Object.keys(data).forEach((key) => {
          tableList.push({
            id: key,
            name: data[key],
            isEdit: false,
            nameInput: data[key],
            key
          })
        })
				setDataSource(tableList)
			}
		})
  }

  useEffect(() => {
    getTableData()
  }, []);

  const columns = [
    {
      title: '新闻栏目',
      dataIndex: 'name',
      render: (text, record, index) => (
        <div>
          {
            record.isEdit && (
              <Input placeholder="请输入栏目名称" defaultValue={text} onChange={(event) => {changeTableName(event, index)}} />
            )
          }
          {
            !record.isEdit && (
              <span>{text}</span>
            )
          }
        </div>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 150,
      render: (text, record, index) => (
        <div>
          {
            !record.isEdit && (
              <>
                <Button style={{marginRight: '4px'}} size="small" onClick={() => { handleEdit(record, index) }} type="primary">编辑</Button>
                <Button danger size="small" onClick={() => { delItem(record) }} type="primary">删除</Button>
              </>
            )
          }
          {
            record.isEdit && (
              <>
                <Button style={{marginRight: '4px'}} size="small" onClick={() => { handleSave(record, index) }} type="primary">保存</Button>
                <Button size="small" onClick={() => { handleCancelSave(record, index) }} >取消</Button>
              </>
            )
          }
        </div>
      )
    }
  ];

  // 改变table名称的值
  const changeTableName = (event, index) => {
    console.log('------changeTableName-------', event.target.value, index)
    const listTemp = cloneDeep(dataSource)
    listTemp[index].nameInput = event.target.value
    setDataSource(listTemp)
  }

  // 保存table内输入框
  const handleSave = (value, index) => {
    console.log(value, index)
    const sendData = {
      id: value.id,
      name: value.nameInput
    }
    newsCateEdit(sendData).then((rep) => {
			if(rep.error_code === 0) {
        message.success('操作成功');
        const listTemp = cloneDeep(dataSource)
        listTemp[index].isEdit = false
        listTemp[index].name = value.nameInput
        setDataSource(listTemp)
      } else {
        message.error(rep.msg);
      }
    })
  }

  // 编辑table
  const handleEdit = (value, index) => {
    console.log(value, index)
    const listTemp = cloneDeep(dataSource)
    listTemp[index].isEdit = true
    setDataSource(listTemp)
  }

  // 取消编辑table
  const handleCancelSave = (value, index) => {
    console.log(value, index)
    const listTemp = cloneDeep(dataSource)
    listTemp[index].isEdit = false
    setDataSource(listTemp)
  }
  
  const handleOk = (value) => {
    props.modalChange(false);
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

  // 删除栏目
  const delItem = values => {
    const sendData = {
      id: values.id
    }
    Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
        newsCateDel(sendData).then((rep) => {
          if(rep.error_code === 0) {
            message.success('操作成功');
            getTableData()
          } else {
            message.error(rep.msg);
          }
        })
      }
    })
  }

  return <Modal
    title='栏目管理'
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <div style={{height: '55px'}}>
      <Form form={form} 
        ref={formRef}
        name="horizontal_login" 
        layout="inline" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: '请输入栏目名称' }]}
        >
          <Input  placeholder="请输入栏目名称" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              新增
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
    
    <Table 
      bordered={true}
      scroll={{
        y: 300
      }}
      pagination={false}
      dataSource={dataSource} 
      columns={columns} />
  </Modal>
}

export default CategoryInfo