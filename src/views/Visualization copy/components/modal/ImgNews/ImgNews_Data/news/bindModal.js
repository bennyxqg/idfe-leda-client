import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message, Select, Table } from 'antd';
import VisContext from "@/views/Visualization/VisContext";
import lodash from 'lodash'
const { Option } = Select;

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const EditModal = (props) => {
  const { allNews, setAllNews } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)
  const [tableData, setTableData] = useState([])

  const formRef = useRef();
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '名称',
      dataIndex: 'title'
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: (text, record, index) => (
        <div className="btns">
            <Button size="small" onClick={() => { handleDel(record, index) }} danger type="primary">删除</Button>
        </div>
      )
    },
  ]

  useEffect(() => {
    if(props.editForm && props.editForm.Uid) {
      console.log('-----props.editForm.list-------', props.editForm.list)
      setTableData(props.editForm.list || [])
    }
  }, []);

  const handleDel = (row, index) => {
    const tableDataTemp = lodash.cloneDeep(tableData)
    tableDataTemp.splice(index, 1)
    setTableData(tableDataTemp)
  }

  const handleOk = (value) => {
    props.successCB({
      Uid: props.editForm.Uid,
      list: tableData
    });
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  const onFinish = values => {
    const sendData = values
    let list = lodash.cloneDeep(tableData)
    if(sendData && sendData.id) {
      let item = null
      allNews.some((i) => {
        if(i.id == sendData.id) {
          item = lodash.cloneDeep(i)
          return true
        }
        return false
      })
      list.push(item)
      console.log('------onFinish-------',list, item)
      setTableData(list)
    }

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  return <Modal
    title={'绑定新闻'}
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
      layout="inline"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      ref={formRef}
      form={form}
    >
      <FormItem label="" name="id">
        <Select
          showSearch
          allowClear={true}
          style={{ width: 300 }}
          placeholder="搜索新闻标题"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {
            allNews.map(item => (
              <Option key={item.id} value={item.id}>
                <span title={item.title}>
                  {item.title}
                </span>
              </Option>
            ))
          }
        </Select>
      </FormItem>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          添加
        </Button>
      </Form.Item>
    </Form>
    <Table
      className='mar-t-8'
      columns={columns} dataSource={tableData} rowKey="id" bordered="true" pagination={false} />
    </div>
  </Modal>

}

export default EditModal