import React, {useState, useEffect, useRef, useContext, useImperativeHandle} from "react";
import { Modal, Button, Form, Input, message, Select, Table } from 'antd';
import { addPic, editPic, delPic } from '@/http/hcarousel'
import EditModal from './EditModal'
import GroupModal from './GroupModal'
import {cloneDeep} from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";
import { getAllCarouselByGroup } from '@/utils/data'

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;


const Index = React.forwardRef((props, ref) => {
  const { allPic, setAllPic } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)
  const [groupModalVisible, setGroupModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [tableData, setTableData] = useState([])
  const [editForm, setEditForm] = useState(null)
  const [currentGroup, setCurrentGroup] = useState(null)
  
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
            <img style={{maxWidth: '60px', maxHeight: '60px'}} src={text} alt={record.name} />
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
        <div>
            <Button className='mar-r-2' size="small" onClick={() => { handleEdit('edit', record) }} type="primary">编辑</Button>
            <Button className='mar-r-2' size="small" onClick={() => { handleDel(record, index) }} danger type="primary">删除</Button>
        </div>
      )
    },
  ]
  
  useEffect(() => {
    console.log('----props.imgData-------', props.imgData)
    if(props.imgData) {
      const imgData = cloneDeep(props.imgData)
      if(imgData.groupId) {
        setCurrentGroup(imgData.groupId)
        setTableData(imgData.list)
      }
    }
  }, []);

  // 改变分组数据
  const changeGroup = (val, list = allPic) => {
    setCurrentGroup(val)
    list.some((item) => {
      if(item.id == val) {
        setTableData(item.list)
        return true
      }
      return false
    })
  }


  // 透传至父组件的数据
  const dataToParent = () => {
    return {
      groupId: currentGroup,
      list: tableData
    }
  }

  const handleEdit = (type, row) => {
    handleEditModal(row)
  }

  const handleDel = (row, index) => {
    Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
        const sendData = {
					id: row.id
				}
        delPic(sendData).then(async (rep) => {
					if(rep.error_code === 0) {
						message.success('操作成功');
            const imgList = await getAllCarouselByGroup()
            setAllPic(imgList)
            changeGroup(currentGroup, imgList)
					} else {
						message.error(rep.msg);
					}
				})
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
  
  // 展示分组数据
  const handleGroup = () => {
    setGroupModalVisible(true)
  }

  // 关闭打开栏目弹窗
  const	modalChange = (val) => {
    setEditModalVisible(val)
  }
  
  const groupModalChange = (val) => {
    setGroupModalVisible(val)
  }

	const	successCB = async (item) => {
    const imgList = await getAllCarouselByGroup()
    setAllPic(imgList)
    changeGroup(currentGroup, imgList)
    setEditModalVisible(false)
  }



  return <div ref={ref}>
      <div>
        <div style={{'marginBottom': '10px', height: '30px'}}>
          <div style={{'float': 'left'}}>
            <span>选择所属分组：</span>
            <span>
            <Select 
              value={currentGroup}
              style={{ width: 120 }} onChange={(val) => {changeGroup(val)}}>
              {
                allPic.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  )
                })
              }
            </Select>
            </span>
          </div>
          <div style={{'float': 'right'}}>
            <Button type="primary" className='btn mar-r-4' onClick={() => handleEditModal()}>
            新增轮播图
            </Button>
            <Button type="primary" className={'btn'} onClick={() => handleGroup()}>
            管理分组
            </Button>
          </div>
        </div>
				<Table
					columns={columns} dataSource={tableData} rowKey="id" bordered="true" pagination={false} />
				{
					editModalVisible && (
						<EditModal
              editForm={editForm}
							modalChange={modalChange}
							successCB={successCB}
						></EditModal>
					)
				}
        {
					groupModalVisible && (
						<GroupModal
              editForm={editForm}
							modalChange={groupModalChange}
							successCB={successCB}
						></GroupModal>
					)
				}
			</div>
    </div>

})

export default Index