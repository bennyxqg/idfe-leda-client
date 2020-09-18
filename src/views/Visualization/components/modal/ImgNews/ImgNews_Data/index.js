import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message, Select, Table, Tabs } from 'antd';
import lodash from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";
import ImgComp from './img/index'
import NewsComp from './news/index'

const { TabPane } = Tabs;

const Index = (props) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)

  const Img = useRef();
  const News = useRef();

  const handleOk = (value) => {
    // // 把数据更新至全局数据中
    let isChange = false
    // 子组件数据
    const chooseSectionTemp = lodash.cloneDeep(chooseSection)
    if(News.current && News.current.dataToParent) {
      const newsData = News.current.dataToParent()
      chooseSectionTemp.data.newsList.groups = newsData
      isChange = true
    }

    if(Img.current && Img.current.dataToParent) {
      const {groupId, list} = Img.current.dataToParent()
      // chooseSectionTemp.data.imgs = imgData
      chooseSectionTemp.data.imgs.groupId = groupId
      chooseSectionTemp.data.imgs.list = list
      isChange = true
    }
    if(isChange) {
      setChooseSection(chooseSectionTemp)
    }
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
      handleOk()
    }
  }

  return <Modal
    maskClosable={false}
    title={'轮播图&新闻模块数据管理'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    width='1200px'
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <div >
      <div>
      <Tabs type="card">
        {/* <TabPane tab="新闻管理" key="1">
          <NewsComp 
            ref={News}
            data={props.data}
          />
        </TabPane> */}
        <TabPane tab="轮播图管理" key="1">
          <ImgComp 
            ref={Img}
            data={props.data}
          />
        </TabPane>
      </Tabs>
			</div>
    </div>
  </Modal>

}

export default Index