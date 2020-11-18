import React, {useState, useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { Modal, Form, Tabs, message, List, Table, Button } from 'antd';
import VisContext from "@/views/Visualization/context/VisContext";
import { getQueryVariable } from '@/utils/helper'
import { FormOutlined, EyeOutlined, 
  SettingOutlined,DeleteOutlined } from '@ant-design/icons';
import {getGuidePageList, delGuidePage, addPage, allPageList, getWebsiteAddress} from '@/http/hvisualization'
import EditComp from './EditModal'

const { TabPane } = Tabs;

let address = {}

const Index = (props) => {
  let history = useHistory();
  const { pageItem, setShowPagesModal } = useContext(VisContext)

  const [modalVisible] = useState(true)
  const [currentType, setCurrentType] = useState('')
  const [showEditComp, setShowEditComp] = useState(false)
  const [editData, setEditData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [allPages, setAllPages] = useState([])

  const [form] = Form.useForm();

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 120
    },
    {
			title: '导航描述',
			dataIndex: 'desc',
      width: 120,
    },
    {
      title: '地址',
      width: 250,
      dataIndex: 'address',
      render: (text, record, index) => (
        <div>
          <a href={text} target='_blank'>{text}</a>
        </div>
      )
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
            {/* <span 
              title='浏览'
              className='mar-r-8 cursor-p hover-blue'><EyeOutlined /></span> */}
            <span 
              title='编辑'
              className='mar-r-12 cursor-p hover-blue' onClick={() => { toPage(record) }}><FormOutlined /></span>
            <span 
              title='设置'
              className='mar-r-12 cursor-p hover-blue' onClick={() => { handleEdit('edit', record) }}><SettingOutlined /></span>
            {/* <span 
              title='删除'
              className='cursor-p hover-blue' onClick={() => { handleDel(record, index) }}><DeleteOutlined /></span> */}
        </div>
      )
    },
  ]

  useEffect(() => {
    const init = async () => {
      let pageType = getQueryVariable('type', history.location.search)
    // if(!pageType) {
    //   pageType = 'pc'
    // }
    // if(pageType === 'popup') {
    //   pageType = 'pc'
    // }
      setCurrentType(pageType)
      
      await websiteAddress()
      getList(pageType, false)
    }
    init()
    
  }, []);

  // 获取列表
  const getList = async (type = 'pc', reload = false) => {
    const currentPageData = []
    let pages = []
    const typeMapping = {
      'pc': '0',
      'popup': '1',
      'wap': '3',
    }
    if(allPages.length === 0 || reload) {
      await allPageList().then((result) => {
        if(result.error_code === 0 && result.data) {
          pages = result.data
          setAllPages(pages)
        }
      })
    } else {
      pages = allPages
    }
    pages.forEach((item) => {
      if(item.type == typeMapping[type]) {
        let addressStr = ''
        if(item.identifer === 'index') {
          // addressStr = '/' + item.identifer
        } else {
          addressStr = '/pages/' + item.identifer
        }
        if(type === 'wap') {
          addressStr = '/wap' + addressStr
        }
        if(address && address.index) {
          addressStr = address.index + addressStr
        }
        if(type === 'popup') {
          addressStr = ''
        }

        currentPageData.push(
          {
            id: item.id, 
            name: item.name, 
            desc: item.desc, 
            identifer: item.identifer,
            type: item.type,
            title: item.title,
            keywords: item.keywords,
            address: addressStr
          })
      }
    })
    setTableData(currentPageData)
  }

  // 编辑页面
	const handleEdit = (type, record) => {
    setEditData(record)
    setShowEditComp(true)
	}

  	// 添加页面
	const handleAddPage = () => {
    setEditData(null)
    setShowEditComp(true)
	}

  	// 删除页面
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
  
  // 编辑完成
  const editFinish = () => {
    setShowEditComp(false)
    getList(currentType, true)
  }

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = (value) => {
    setShowPagesModal({
      show: false
    })
  }

  const changeTab = (value) => {
    setCurrentType(value)
    getList(value, false)
  }

  // 编辑弹窗
  const modalChange = (val) => {
    setShowEditComp(val)
  }

  const toPage = (item) => {
    if(pageItem.id == item.id) {
      setShowPagesModal({
        show: false
      })
      return
    }
    
    // const type = getQueryVariable('type', history.location.search)
    // 跳转至该页面
    history.push({
      pathname: `/visualization`,
      search: `?type=${currentType}&id=${item.id}`
    })
  }

  const websiteAddress = () => {
		const sendData = {}
		getWebsiteAddress(sendData).then((rep) => {
			if(rep.error_code === 0) {
				address = rep.data
			} else {
				message.error(rep.msg);
			}
		})
	}

  return <Modal
    title={'选择页面/弹框'}
    maskClosable={false}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    footer={null}
    width='700px'
  >
    <div>
      <Tabs onChange={changeTab} type="card" activeKey={currentType}>
        <TabPane tab="电脑端页面" key="pc">
        </TabPane>
        <TabPane tab="移动端页面" key="wap">
        </TabPane>
        <TabPane tab="弹框模块" key="popup">
        </TabPane>
      </Tabs>
      <div>
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
            type="dashed" onClick={handleAddPage}>
            + 添加
          </Button>
        </div>
      </div>
      {
        showEditComp && (
          <EditComp 
            data={editData}
            modalChange={modalChange}
            editFinish={editFinish}
            type={currentType}
          />
        )
      }
    </div>
  </Modal>

}

export default Index