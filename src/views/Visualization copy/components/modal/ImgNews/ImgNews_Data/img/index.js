import React, {useState, useEffect, useRef, useContext, useImperativeHandle} from "react";
import { Modal, Button, Form, Input, message, Select, Table } from 'antd';
import { addPic, editPic } from '@/http/hcarousel'
import ImgUpload from '@/components/ImgUpload'
import EditModal from './EditModal'
import { randomCode, getItemIndexByKey } from '@/utils/helper'
import lodash from 'lodash'

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;


const Index = React.forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(true)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [tableData, setTableData] = useState([])
  const [editForm, setEditForm] = useState(null)
  
  useImperativeHandle(ref, () => ({
    ref: ref.current,
    dataToParent: dataToParent
  }));

  const columns = [
    {
      title: '图片',
      dataIndex: 'url',
      render: (text, record) => (
        <div>
            <img style={{maxWidth: '100px'}} src={text} alt={record.name} />
        </div>
      )
    },
    {
      title: '标题',
      dataIndex: 'name'
    },
    {
      title: '链接',
      dataIndex: 'jump_url'
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 200,
      render: (text, record, index) => (
        <div className="btns">
            <Button size="small" onClick={() => { handleEdit('edit', record) }} type="primary">编辑</Button>
            <Button size="small" onClick={() => { handleDel(record, index) }} danger type="primary">删除</Button>
        </div>
      )
    },
  ]
  
  useEffect(() => {
    if(props.data && props.data.data) {
      const imgList = lodash.cloneDeep(props.data.data.imgs)
      imgList.forEach(img => {
        img.Uid = randomCode(10)
      });
      setTableData(imgList)
  
    }
  }, []);

  // 透传至父组件的数据
  const dataToParent = () => {
    return tableData
  }

  const handleEdit = (type, row) => {
    handleEditModal(row)
  }

  const handleDel = (row, index) => {
    Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
        const tableDataTemp = lodash.cloneDeep(tableData)
        tableDataTemp.splice(index, 1)
        setTableData(tableDataTemp)
      }
    })
  }

  	// 编辑弹窗
	const handleEditModal = (editForm = null) => {
    if(editForm) {
      setEditForm(editForm)
    } else {
      setEditForm(null)
    }
    setEditModalVisible(true)
	}

  // 关闭打开栏目弹窗
  const	modalChange = (val) => {
    setEditModalVisible(val)
	}

	const	successCB = (item) => {
    // 改变图片数据
    const tableDataTemp = lodash.cloneDeep(tableData)
    const itemTemp = lodash.cloneDeep(item)
    if(item.Uid) {
      const index = getItemIndexByKey(tableData, 'Uid', item.Uid)
      tableDataTemp.splice(index, 1)
      tableDataTemp.splice(index, 0, itemTemp)
    } else { // 加入新的图片
      itemTemp.Uid = randomCode(10)
      tableDataTemp.push(itemTemp)
    }
    setTableData(tableDataTemp)
    setEditModalVisible(false)
	}


  return <div ref={ref}>
      <div>
        <div style={{textAlign: 'right', 'marginBottom': '10px'}}>
          <Button type="primary" className={'btn'} onClick={() => handleEditModal()}>
          新增轮播图
          </Button>
        </div>
				<Table
					columns={columns} dataSource={tableData} rowKey="Uid" bordered="true" pagination={false} />
				{
					editModalVisible && (
						<EditModal
              editForm={editForm}
							modalChange={modalChange}
							successCB={successCB}
						></EditModal>
					)
				}
			</div>
    </div>

})

export default Index