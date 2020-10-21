import React, {useState, useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { Modal, Form, Tabs, message,List } from 'antd';
import VisContext from "@/views/Visualization/context/VisContext";
import { getQueryVariable } from '@/utils/helper'

const { TabPane } = Tabs;

const Index = (props) => {
  let history = useHistory();
  const { pageItem, pageData, setShowPagesModal } = useContext(VisContext)

  const [modalVisible] = useState(true)
  const [pageList, setPageList] = useState([])
  const [popupList, setPopupList] = useState([])
  const [wapList, setWapList] = useState([])
  const [currentType, setCurrentType] = useState([])

  const [form] = Form.useForm();

  useEffect(() => {
    let pageType = getQueryVariable('type', history.location.search)
    if(!pageType) {
      pageType = 'pc'
    }
    if(pageType === 'popup') {
      pageType = 'pc'
    }
    setCurrentType(pageType)
    
    getList(pageType)
  }, []);

  // 获取列表
  const getList = (type = 'pc') => {
    if(type === 'pc') { // 页面
      if(pageList.length) {
        return
      }
      setPageList(pageData.filter(item => item.type === 'pc'))
    } else if(type === 'popup') { // 弹窗
      if(popupList.length) {
        return
      }
      const list = pageData.filter(item => item.type === 'popup')
      setPopupList(list)
    } else if(type === 'wap') { // 弹窗
      if(wapList.length) {
        return
      }
      const list = pageData.filter(item => item.type === 'wap')
      setWapList(list)
    }
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
    getList(value)
  }

  const toPage = (item) => {

    // console.log('---toPage---item----', item)
    // return
    if(pageItem.id == item.id) {
      return
    }
    
    // const type = getQueryVariable('type', history.location.search)
    // 跳转至该页面
    history.push({
      pathname: `/visualization`,
      search: `?type=${item.type}&id=${item.id}`
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
    width='600px'
  >
    <div >
      <Tabs onChange={changeTab} type="card" activeKey={currentType}>
        <TabPane tab="电脑端页面" key="pc">
          <List
            itemLayout="horizontal"
            dataSource={pageList}
            renderItem={item => (
              <List.Item style={{'borderBottom': '1px solid #f0f0f0'}}>
                <div style={{'display': 'block', width: '100%', cursor: 'pointer'}}
                  onClick={() => {toPage(item)}}
                  >
                  <div>{item.name}</div>
                  <div style={{'color': '#aaa'}}>{item.desc}</div>
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="移动端页面" key="wap">
          <List
            itemLayout="horizontal"
            dataSource={wapList}
            renderItem={item => (
              <List.Item style={{'borderBottom': '1px solid #f0f0f0'}}>
                <div style={{'display': 'block', width: '100%', cursor: 'pointer'}}
                  onClick={() => {toPage(item)}}
                  >
                  <div>{item.name}</div>
                  <div style={{'color': '#aaa'}}>{item.desc}</div>
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="弹框模块" key="popup">
          <List
            itemLayout="horizontal"
            dataSource={popupList}
            renderItem={item => (
              <List.Item style={{'borderBottom': '1px solid #f0f0f0'}}>
                <div style={{'display': 'block', width: '100%', cursor: 'pointer'}}
                  onClick={() => {toPage(item)}}
                  >
                  <div>{item.name}</div>
                  <div style={{'color': '#aaa'}}>{item.desc}</div>
                </div>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  </Modal>

}

export default Index