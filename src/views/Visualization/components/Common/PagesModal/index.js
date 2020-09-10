import React, {useState, useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { Modal, Form, Tabs, message,List } from 'antd';
import VisContext from "@/views/Visualization/VisContext";
import { getPageList, getPopupList } from '@/http/hvisualization'
import lodash from 'lodash'

const { TabPane } = Tabs;

const Index = (props) => {
  let history = useHistory();
  const { pageItem, pageData, setShowPagesModal } = useContext(VisContext)

  const [modalVisible] = useState(true)
  const [pageList, setPageList] = useState([])
  const [popupList, setPopupList] = useState([])

  const [form] = Form.useForm();

  useEffect(() => {
    getList('page')
  }, []);

  // 获取列表
  const getList = (type = 'page') => {
    if(type === 'page') { // 页面
      if(pageList.length) {
        return
      }
      setPageList(pageData.filter(item => item.type === 'page'))
    } else if(type === 'popup') { // 弹窗
      if(popupList.length) {
        return
      }
      setPopupList(pageData.filter(item => item.type === 'popup'))
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

  const onFinish = values => {
    message.success('操作成功');
    const sendData = values
    props.onFinish(sendData);
  };

  const changeTab = (value) => {
    getList(value)
  }

  const toPage = (item) => {
    if(pageItem.id == item.id) {
      return
    }
    
    // 跳转至该页面
    history.push({
      pathname: `/visualization`,
      search: `?id=${item.id}`
    })
  }

  return <Modal
    title={'选择页面/弹框'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
  >
    <div >
      <Tabs onChange={changeTab} type="card">
        <TabPane tab="系统页面" key="page">
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
      </Tabs>,
    </div>
  </Modal>

}

export default Index