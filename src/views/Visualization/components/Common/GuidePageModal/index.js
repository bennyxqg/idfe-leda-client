import React, {useState, useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { Modal, Form, message, Table, Button } from 'antd';
import VisContext from "@/views/Visualization/context/VisContext";
import { getQueryVariable } from '@/utils/helper'
import { FormOutlined, EyeOutlined, 
  SettingOutlined,DeleteOutlined } from '@ant-design/icons';
import {getGuidePageList, delGuidePage} from '@/http/hvisualization'
import EditComp from './EditModal'

const Index = (props) => {
	const { pageItem } = useContext(VisContext)

  let history = useHistory();

	const [modalVisible] = useState(true)
	const [tableData, setTableData] = useState([])
  const [showEditComp, setShowEditComp] = useState(false)
  const [editData, setEditData] = useState(null)

	const [form] = Form.useForm();
	
	const columns = [
    {
      title: '落地页名称',
      dataIndex: 'name',
      width: 120
    },
    {
			title: '导航描述',
			dataIndex: 'desc',
      width: 120,
      // render: (text, record, index) => {
      //   let str = ''
      //   return (
      //     <div>
      //       {str}
      //     </div>
      //   )
      // }
    },
    {
      title: '落地页地址',
      width: 250,
      dataIndex: 'address',
      // textWrap: 'address',
      // ellipsis: true,
      // render: (text, record, index) => {
      //   let str = 'test'
      //   return (
      //     <div>
      //       {str}
      //     </div>
      //   )
      // }
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 160,
      render: (text, record, index) => (
        <div style={{
					color: '#666'
				}}>
            {/* <Button className='mar-r-2' size="small" onClick={() => { handleEdit('edit', record) }} type="primary">编辑</Button>
            <Button size="small" onClick={() => { handleDel(record, index) }} danger type="primary">删除</Button> */}
            <span 
              title='浏览'
              className='mar-r-8 cursor-p hover-blue'><EyeOutlined /></span>
            <span 
              title='编辑'
              className='mar-r-8 cursor-p hover-blue' onClick={() => { toPage(record) }}><FormOutlined /></span>
            <span 
              title='设置'
              className='mar-r-8 cursor-p hover-blue' onClick={() => { handleEdit('edit', record) }}><SettingOutlined /></span>
            <span 
              title='删除'
              className='cursor-p hover-blue' onClick={() => { handleDel(record, index) }}><DeleteOutlined /></span>
        </div>
      )
    },
  ]

  useEffect(() => {
		// setTableData([
		// 	{
		// 		id: 1,
		// 		name: 'aaa'
		// 	}
    // ])
    pageList()
  }, []);
  
  const pageList = () => {
    getGuidePageList().then((result) => {
      if(result.error_code === 0 && result.data) {
        const pageData = result.data.map((item) => {
          return {
            id: item.id, 
            name: item.name, 
            desc: item.desc, 
            address: item.address
          }
        })
        setTableData(pageData)
      }
    })
  }

	// 添加落地页
	const addGuidePage = () => {
    setEditData(null)
    setShowEditComp(true)
	}

	// 编辑落地页
	const handleEdit = (type, record) => {
    setEditData(record)
    setShowEditComp(true)
	}
	
	// 删除落地页
	const handleDel = (record, index) => {
    Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
        delGuidePage({
          id: record.id
        }).then((result) => {
          if(result.error_code === 0) {
            message.success('操作成功')
            editFinish();
          }
        })
      }
    })
	}

  const toPage = (item) => {
    if(pageItem.id == item.id) {
      return
    }
    
    // const type = getQueryVariable('type', history.location.search)
    // 跳转至该页面
    history.push({
      pathname: `/visualization`,
      search: `?type=guide&id=${item.id}`
    })
  }

  // 编辑弹窗
  const modalChange = (val) => {
    setShowEditComp(val)
  }

  // 编辑完成
  const editFinish = () => {
    setShowEditComp(false)
    pageList()
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  return <Modal
    title={'落地页列表'}
    visible={modalVisible}
    cancelText='取消'
    onCancel={handleCancel}
    okText='确定'
    width='800px'
    footer={null}
  >
    <div >
			<Table
				pagination={false}
				rowKey="id"
				columns={columns} dataSource={tableData}
			/>
			<div style={{
				textAlign: 'center',
				marginTop: '20px'
			}}>
				<Button 
					style={{
						width: '500px'
					}}
					type="dashed" onClick={addGuidePage}>
					+ 添加落地页
				</Button>
			</div>
    </div>
    {
      showEditComp && (
        <EditComp 
          data={editData}
          modalChange={modalChange}
          editFinish={editFinish}
        />
      )
    }
  </Modal>

}

export default Index