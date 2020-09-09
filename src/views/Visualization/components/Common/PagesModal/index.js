import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Tabs, message,List } from 'antd';
import VisContext from "@/views/Visualization/VisContext";

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const Index = (props) => {
  const { sectionList, setShowPagesModal } = useContext(VisContext)

  const [modalVisible] = useState(true)
  const [pageList, setPageList] = useState([])
  const [popupList, setPopupList] = useState([])

  const formRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    setPageList([
      {
        title: '文章列表页',
        desc: '文章列表页面'
      },
      {
        title: '文章详情页',
        desc: '弹框描述弹框描述弹框描述弹框描述弹框描述'
      }
    ])
    setPopupList([
      {
        title: '文章列表页2',
        desc: '文章列表页面'
      },
      {
        title: '文章详情页2',
        desc: '弹框描述弹框描述弹框描述弹框描述弹框描述'
      }
    ])
  }, []);

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
      <Tabs type="card">
        <TabPane tab="系统页面" key="1">
          <List
            itemLayout="horizontal"
            dataSource={pageList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={<div>{item.desc}</div>}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="弹框模块" key="2">
          <List
            itemLayout="horizontal"
            dataSource={popupList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={<div>{item.desc}</div>}
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>,
    </div>
  </Modal>

}

export default Index